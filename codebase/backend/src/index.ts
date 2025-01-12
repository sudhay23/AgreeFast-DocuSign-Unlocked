import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { writeToFile } from "./utils.js";
import Envelope from "./models/Envelope.js";
import amqp from "amqplib";
import { fileURLToPath } from "url";
import path from "path";
import envelopeRoutes from "./routes/envelopeRoutes.js";

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(
  "Resolved .env file path:",
  path.join(__dirname, "..", "..", "..", ".env")
);

dotenv.config({
  path: path.join(__dirname, "..", "..", "..", ".env"), // Going up two levels from backend
});

const app = express();
const PORT = 5500;
const MONGODB_URI = process.env.MONGODB_URI;
const RABBITMQ_URI = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`;
const RABBITMQ_QUEUE = process.env.RABBITMQ_WORKER_QUEUE_NAME;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Serve static files from the 'static' directory
app.use("/static", express.static(path.join(__dirname, "..", "static")));

let channel: amqp.Channel;

// Connect to RabbitMQ
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URI!); // Ensure you have the correct RabbitMQ URI
    channel = await connection.createChannel();
    await channel.assertQueue(RABBITMQ_QUEUE!, { durable: true }); // Ensure the queue exists
    console.log("Connected to RabbitMQ");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error connecting to RabbitMQ:", err.message);
      process.exit(1);
    } else {
      console.error("Error connecting to RabbitMQ:", err);
      process.exit(1);
    }
  }
};

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

// Initialize RabbitMQ connection
connectRabbitMQ();

app.use("/api/envelope", envelopeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/webhook", async (req: Request, res: Response) => {
  // console.log(req.body);
  const type = req.body.event;
  console.log("type: ", type);
  if (type == "envelope-sent") {
    const data = req.body.data;
    const envelope = new Envelope();
    envelope.envelope_id = data.envelopeId;
    envelope.recipients_emails = data.envelopeSummary.recipients.signers.map(
      (signer: any) => signer.email
    );
    envelope.sender_id = data.userId;
    envelope.sender_email = data.envelopeSummary.sender.email;

    const docs = data.envelopeSummary.envelopeDocuments.filter(
      (doc: any) => doc.name != "Summary"
    );
    const agreements = [];
    for (const doc of docs) {
      writeToFile(doc.documentIdGuid, doc.PDFBytes);
      agreements.push({
        file_name: doc.name,
        file_uri: `/static/${doc.documentIdGuid}.pdf`,
      });
    }
    envelope.agreements = agreements;
    await envelope.save();
    if (channel) {
      channel.sendToQueue(
        RABBITMQ_QUEUE!,
        Buffer.from(`{"envelope_id":"${data.envelopeId}"}`)
      );
      console.log(`${data.envelopeId} sent to '${RABBITMQ_QUEUE}'`);
    }
  } else if (type == "envelope-completed") {
    const data = req.body.data;
    const completedDateTime = new Date(
      data.envelopeSummary.completedDateTime
    ).getTime();
    const envelope_id = data.envelopeId;
    const envelope = await Envelope.findOne({ envelope_id });
    if (envelope) {
      envelope.signed_on = completedDateTime;
      await envelope.save();
    } else {
      console.log(`Envelope not found with envelope_id: ${envelope_id}`);
    }
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`);
});

process.on("SIGTERM", () => {
  process.exit(0);
});
process.on("SIGINT", () => {
  process.exit(0);
});
