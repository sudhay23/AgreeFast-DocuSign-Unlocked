/**
 * @swagger
 * /api/envelope/{id}/getActivationStatus:
 *   get:
 *     summary: Get the activation status of an envelope
 *     description: Retrieve whether the specified envelope is currently active or not.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the activation status of the envelope.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isActive:
 *                   type: boolean
 *                   description: The activation status of the envelope.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/activate:
 *   get:
 *     summary: Activate an envelope
 *     description: Activate the specified envelope and send a notification email to all recipients.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envelope activated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/deactivate:
 *   get:
 *     summary: Deactivate an envelope
 *     description: Deactivate the specified envelope.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envelope deactivated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/getIcsData:
 *   get:
 *     summary: Get ICS data for an envelope
 *     description: Retrieve ICS data associated with the specified envelope.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with ICS data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 icsData:
 *                   type: string
 *                   description: The ICS data associated with the envelope.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/chat:
 *   post:
 *     summary: Chat functionality for an envelope
 *     description: Process user questions related to the specified envelope through the chat service.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_question:
 *                 type: string
 *                 description: The user's question.
 *                 example: "What is the status of this envelope?"
 *     responses:
 *       200:
 *         description: Chat response from the service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: The response from the chat service.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/aiProcessingComplete:
 *   post:
 *     summary: Mark AI processing as complete
 *     description: Mark the AI processing for the specified envelope as complete and notify the sender.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: AI processing marked as complete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/getObligationScore:
 *   get:
 *     summary: Get compliance obligation score
 *     description: Retrieve the compliance obligation score for the specified envelope.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the compliance obligation score.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 compliance_obligatory_score:
 *                   type: number
 *                   description: The compliance obligation score of the envelope.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/getObligations:
 *   get:
 *     summary: Get obligations
 *     description: Retrieve the obligations associated with the specified envelope.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the obligations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 obligations:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The obligations associated with the envelope.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/getSignedDate:
 *   get:
 *     summary: Get signed date
 *     description: Retrieve the signed date for the specified envelope.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the signed date.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signed_on:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the envelope was signed.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/{id}/getAgreements:
 *   get:
 *     summary: Get agreements
 *     description: Retrieve the agreements associated with the specified envelope.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the agreements.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 agreements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       agreement_id:
 *                         type: string
 *                         description: The unique identifier of the agreement.
 *                       details:
 *                         type: string
 *                         description: Additional details about the agreement.
 *       404:
 *         description: Envelope not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Envelope not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/generate-pkce:
 *   get:
 *     summary: Generate PKCE code verifier and challenge
 *     description: Generates a PKCE (Proof Key for Code Exchange) code_verifier and its hashed code_challenge.
 *     responses:
 *       200:
 *         description: Successful response with code_verifier and code_challenge.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code_verifier:
 *                   type: string
 *                   description: The generated code_verifier (43-128 characters).
 *                 code_challenge:
 *                   type: string
 *                   description: The SHA-256 hashed code_verifier (code_challenge).
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */

/**
 * @swagger
 * /api/envelope/get-signing-url:
 *   get:
 *     summary: Get envelope signing URL
 *     description: Retrieves the signing URL for the specified envelope and recipient.
 *     parameters:
 *       - in: query
 *         name: base_uri
 *         required: true
 *         description: The base URI for the API endpoint.
 *         schema:
 *           type: string
 *       - in: query
 *         name: account_id
 *         required: true
 *         description: The account ID associated with the envelope.
 *         schema:
 *           type: string
 *       - in: query
 *         name: envelopeId
 *         required: true
 *         description: The unique identifier of the envelope.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         description: The recipient's email address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: accessToken
 *         required: true
 *         description: The access token for authentication.
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         required: true
 *         description: The recipient's name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the signing URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: The generated signing URL.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     signingUrl:
 *                       type: string
 *                       example: Error generating signing URL
 */

import express, { Request, Response } from "express";
import Envelope from "../models/Envelope.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "..", "..", "..", "..", ".env"), // Going up two levels from backend
});

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const CHAT_SERVICE_BASE_URL = process.env.CHAT_SERVICE_BASE_URL;

console.log("Email user:", EMAIL_USER);
console.log("Email pass:", EMAIL_PASS);

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use your preferred SMTP service
  auth: {
    user: EMAIL_USER, // Email account used to send emails
    pass: EMAIL_PASS, // Password or router-specific password
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
        subject: "Activated agreefast dashboard",
        html: `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        font-family: "Arial", sans-serif;
        line-height: 1.6;
        color: #333333;
      }
      .logo {
        text-align: center;
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
        justify-content: center;
      }
      .logo img {
        width: 70px;
      }
      .envelope-id {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 4px solid #0066cc;
      }
      .action-button {
        display: inline-block;
        padding: 12px 28px;
        margin: 25px 0;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        background-color: #28a745;
        color: white;
        transition: all 0.3s ease;
      }
      .action-button:hover {
        background-color: #218838;
      }
      .dashboard-link {
        border-radius: 8px;
        margin: 20px 0;
        word-break: break-all;
      }
      .signature {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        color: #666666;
      }
      h1 {
        color: black;
        text-align: center;
        font-size: 24px;
        padding-top: 0;
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="${process.env.BACKEND_BASE_URL}/static/logo.png"
          alt="AgreeFast Logo"
        />
        <h1>agreefast</h1>
      </div>

      <p>Dear valued client,</p>

      <p>
        Great news! Your agreefast dashboard has been successfully activated.
      </p>

      <div class="envelope-id"><strong>Envelope ID:</strong> ${envelopeId}</div>

      <p>You now have access to:</p>
      <ul style="padding-left: 20px; color: #444444">
        <li>Comprehensive document analytics</li>
        <li>Smart insights and recommendations</li>
        <li>Advanced agreement tracking</li>
      </ul>

      <p>Access your customized dashboard here:</p>
      <div class="dashboard-link">
        <a
          href="${process.env.FRONTEND_BASE_URL}/room/${envelopeId}"
          class="action-button"
        >
          Access Dashboard
        </a>
      </div>
      <div class="signature">
        <p>
          Best regards,<br />
          The agreefast team
        </p>
        <small
          >This is an automated message. Please do not reply directly to this
          email.</small
        >
      </div>
    </div>
  </body>
</html>
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
      res.json({
        message: "agreefast features activated, you can now close this tab.",
      });
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

// Implement this route
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

// Implement this route
router.post("/:id/chat", async (req: Request, res: Response): Promise<any> => {
  const envelopeId = req.params.id;
  const { user_question } = req.body;
  try {
    const response = await axios.post(`${CHAT_SERVICE_BASE_URL}/chat`, {
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
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        font-family: "Arial", sans-serif;
        line-height: 1.6;
        color: #333333;
      }
      .logo {
        text-align: center;
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
        justify-content: center;
      }
      .logo img {
        width: 70px;
      }

      .envelope-id {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 4px solid #0066cc;
      }
      .button-container {
        margin: 30px 0;
        text-align: center;
        display: flex;
        align-items: center;
        gap: 30px;
        justify-content: center;
      }
      .button {
        display: inline-block;
        padding: 10px 25px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .activate-btn {
        background-color: #28a745;
        color: white;
        border: 3px solid #28a745;
        color: white;
        border-radius: 15px;
        font-weight: 100;
      }
      .activate-btn:hover {
        background-color: #218838;
        border-color: #218838;
      }
      .deactivate-btn {
        border: 3px solid #dc3545;
        color: red;
        border-radius: 15px;
        font-weight: 100;
      }
      .deactivate-btn:hover {
        background-color: #dc3545;
        color: white;
      }
      .signature {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        color: #666666;
      }
      h1 {
        color: black;
        text-align: center;
        font-size: 24px;
        padding-top: 0;
        margin-top: 0;
      }
      span {
        font-weight: 900;
      }
      .end {
        margin-top: 50px;
      }
      .end p {
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="${process.env.BACKEND_BASE_URL}/static/logo.png"
          alt="AgreeFast Logo"
        />
        <h1>agreefast</h1>
      </div>

      <p>Dear valued client,</p>

      <p>
        We hope this email finds you well. We're pleased to inform you that the
        AI processing for your document has been successfully completed.
      </p>

      <div class="envelope-id"><strong>Envelope ID:</strong> ${envelopeId}</div>
      <p>
        To be able to use the <span>agreefast</span> dashboard for this
        envelope, please select one of the following options:
      </p>

      <div class="button-container">
        <a
          href="${process.env.BACKEND_BASE_URL}/api/envelope/${envelopeId}/activate"
          class="button activate-btn"
        >
          Activate <span>agreefast</span>
        </a>
        <a
          href="${process.env.BACKEND_BASE_URL}/api/envelope/${envelopeId}/deactivate"
          class="button deactivate-btn"
        >
          Deactivate <span>agreefast</span>
        </a>
      </div>
      <div class="end">
        <p>
          Upon activation, recipients of the Docusign agreement will receive
          their links to the customized <span>agreefast</span> dashboard opening
          up access to smart document analysis features.
        </p>
        <p>
          As the agreement sender, feel free to deactivate the
          <span>agreefast</span> dashboard any time using this email.
        </p>
      </div>
      <div class="signature">
        <p>
          Best regards,<br />
          The <span>agreefast</span> team
        </p>
        <small
          >This is an automated message. Please do not reply directly to this
          email.</small
        >
      </div>
    </div>
  </body>
</html>

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

router.get("/generate-pkce", (req, res) => {
  // Generate a random code_verifier (43-128 chars)
  const codeVerifier = crypto.randomBytes(32).toString("base64url");

  // Hash code_verifier using SHA-256
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  // Send both back to the frontend
  res.json({ code_verifier: codeVerifier, code_challenge: codeChallenge });
});

router.get("/get-signing-url", async (req: any, res: any) => {
  try {
    const { base_uri, account_id, envelopeId, email, accessToken, name } =
      req.query;
    const response = await axios.post(
      `${base_uri}/restapi/v2.1/accounts/${account_id}/envelopes/${envelopeId}/views/recipient`,
      {
        authenticationMethod: "email",
        returnUrl: `${process.env.FRONTEND_BASE_URL}/room/${envelopeId}`,
        email: email,
        userName: name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.status(200).json({
      data: response.data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {
        signingUrl: "hi",
      },
    });
  }
});

export default router;
