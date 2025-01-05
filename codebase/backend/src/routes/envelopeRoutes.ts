import express, { Request, Response } from 'express';
import Envelope from '../models/Envelope.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '..', '.env'), // Going up two levels from backend
});

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

console.log('Email user:', EMAIL_USER);
console.log('Email pass:', EMAIL_PASS);

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your preferred SMTP service
  auth: {
    user: EMAIL_USER, // Email account used to send emails
    pass: EMAIL_PASS, // Password or app-specific password
  },
});

router.get(
  '/:id/getActivationStatus',
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
      }
      res.json({ isActive: envelope.is_active });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.put(
  '/:id/activate',
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
      }
      envelope.is_active = true;
      await envelope.save();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: envelope.recipients_emails.join(','),
        cc: envelope.sender_email,
        subject: 'Envelope Activated',
        text: `Dear User,

Your envelope with ID: ${envelopeId} has been activated.

Best regards,
AgreeFast Team`,
      };

      try {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
          }
          console.log('Email sent: ' + info.response);
        });
      } catch (err) {
        console.log(err);
      }
      res.json({ message: 'Envelope activated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.put(
  '/:id/deactivate',
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
      }
      envelope.is_active = false;
      await envelope.save();
      res.json({ message: 'Envelope deactivated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.get(
  '/:id/getObligationScore',
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
      }
      res.json({ obligation_score: envelope.obligation_score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.get(
  '/:id/getAgreements',
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
      }
      res.json({ agreements: envelope.agreements });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);
// TODO: Implement this route
router.get(
  '/:id/getEvents',
  async (req: Request, res: Response): Promise<any> => {}
);

// TODO: Implement this route
router.post(
  '/:id/chat',
  async (req: Request, res: Response): Promise<any> => {}
);

router.post(
  '/:id/aiProcessingComplete',
  async (req: Request, res: Response): Promise<any> => {
    const envelopeId = req.params.id;
    try {
      const envelope = await Envelope.findOne({ envelope_id: envelopeId });
      if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
      }
      envelope.ai_processing_complete = true;
      await envelope.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: envelope.recipients_emails.join(','),
        cc: envelope.sender_email,
        subject: 'AI Processing Complete',
        text: `Dear User,

Your envelope with ID: ${envelopeId} has completed the AI processing.

Best regards,
AgreeFast Team`,
      };

      try {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
          }
          console.log('Email sent: ' + info.response);
        });
      } catch (err) {
        console.log(err);
      }

      res.json({ message: 'AI processing complete' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

export default router;
