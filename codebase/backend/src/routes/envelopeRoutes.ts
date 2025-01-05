import express, { Request, Response } from 'express';
import Envelope from '../models/Envelope.js';

const router = express.Router();

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

// TODO: Implement email functionality
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

// TODO: Implement email functionality
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
      res.json({ message: 'AI processing complete' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

export default router;
