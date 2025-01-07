import express, { Request, Response } from "express";
import Envelope from "../models/Envelope.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "..", "..", "..", "..", ".env"), // Going up two levels from backend
});

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const AI_SERVICE_BASE_URL = process.env.AI_SERVICE_BASE_URL;

console.log("Email user:", EMAIL_USER);
console.log("Email pass:", EMAIL_PASS);

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use your preferred SMTP service
  auth: {
    user: EMAIL_USER, // Email account used to send emails
    pass: EMAIL_PASS, // Password or app-specific password
  },
});

router.get(
  "/:id/getActivationStatus",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      res.json({ isActive: envelope.is_active });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

router.get(
  "/:id/activate",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      envelope.is_active = true;
      await envelope.save();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: envelope.recipients_emails.join(","),
        cc: envelope.sender_email,
        subject: "Envelope Activated",
        text: `Dear User,

Your envelope with ID: ${envelopeId} has been activated.

Best regards,
AgreeFast Team`,
      };

      try {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Error sending email" });
          }
          console.log("Email sent: " + info.response);
        });
      } catch (err) {
        console.log(err);
      }
      res.json({ message: "Envelope activated, you can close this tab!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

router.get(
  "/:id/deactivate",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      envelope.is_active = false;
      await envelope.save();
      res.json({ message: "Envelope deactivated, you can close this tab!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

router.get(
  "/:id/getObligationScore",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      res.json({
        compliance_obligatory_score: envelope.compliance_obligatory_score,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);
router.get(
  "/:id/getObligations",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      res.json({
        obligations: envelope.obligations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);
router.get(
  "/:id/getSignedDate",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      res.json({
        signed_on: envelope.signed_on,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

router.get(
  "/:id/getAgreements",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      res.json({ agreements: envelope.agreements });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// TODO: Implement this route
router.get(
  "/:id/getIcsData",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    const envelope = await Envelope.findOne({ envelope_id: envelopeId });
    if (!envelope) {
      return res.status(404).json({ message: "Envelope not found" });
    }
    res.json({ icsData: envelope.ics_data });
  }
);

// TODO: Implement this route
router.post("/:id/chat", async (req: Request, res: Response): Promise<any> => {
  const envelopeId = req.params.id;
  const { user_question } = req.body;
  try {
    const response = await axios.post(`${AI_SERVICE_BASE_URL}/chat`, {
      envelope_id: envelopeId,
      user_question,
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post(
  "/:id/aiProcessingComplete",
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: "Envelope not found" });
      }
      envelope.ai_processing_complete = true;
      await envelope.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: envelope.sender_email,
        subject: "AI Processing Complete (Activate/Deactivate)",
        html: `
    <p>Dear User,</p>
    <p>Your envelope with ID: <strong>${envelopeId}</strong> has completed the AI processing.</p>
    <p>Click on the buttons below to activate or deactivate:</p>
    <a href="${process.env.DEPLOYED_BACKEND_URL}/api/envelope/${envelopeId}/activate" 
       style="display: inline-block; padding: 10px 20px; margin-right: 10px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
      Activate
    </a>
    <a href="${process.env.DEPLOYED_BACKEND_URL}/api/envelope/${envelopeId}/deactivate" 
       style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">
      Deactivate
    </a>
    <p>Best regards,</p>
    <p>AgreeFast Team</p>
  `,
      };

      try {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Error sending email" });
          }
          console.log("Email sent: " + info.response);
        });
      } catch (err) {
        console.log(err);
      }

      res.json({ message: "AI processing complete" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;
