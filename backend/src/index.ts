import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { writeToFile } from './utils.js';

dotenv.config();

const app = express();
const PORT = 5000;
const TOKEN = process.env.WEBHOOK_TOKEN;

app.use(cors());
app.use(express.json());

const seenRequests = new Set<string>();

const fetchRequest = async () => {
  const res = await axios.get(
    `https://webhook.site/token/${TOKEN}/requests?sorting=newest`
  );
  const requests = res.data.data;
  const newRequests = requests.filter(
    (request: any) => !seenRequests.has(request.uuid)
  );
  for (const request of newRequests) {
    const req = JSON.parse(request.content);
    if (req.data?.envelopeSummary?.envelopeDocuments) {
      const docs = req.data.envelopeSummary.envelopeDocuments;
      docs.forEach((doc: any) => {
        if (doc.documentIdGuid && doc.PDFBytes) {
          writeToFile(doc.documentIdGuid, doc.PDFBytes);
        }
      });
    }
    seenRequests.add(request.uuid);
  }
};

// Run the cron job every minute
cron.schedule('* * * * *', async () => {
  fetchRequest();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`);
  console.log('Listening for new requests...');
});
