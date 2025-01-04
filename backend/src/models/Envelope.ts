import mongoose, { Schema, Document } from 'mongoose';

// Interface for Obligation
interface IObligation {
  obligation_statement: string;
  importance_level: number;
  responsible_party_role_name: string;
}

// Interface for Event
interface IEvent {
  start_date: string;
  end_date: string;
  description: string;
  recurring: string;
}

// Define the interface for TypeScript type safety
export interface IEnvelope extends Document {
  envelope_id: string;
  is_active: boolean;
  sender_id: string;
  sender_email: string;
  recipients_emails: string[];
  obligatory_score?: number;
  obligations?: IObligation[];
  events?: IEvent[];
  signed_on?: Date;
  ics_data?: string;
  knowledge_graph_db_name?: string;
  agreements: string[];
}

// Define the schema
const EnvelopeSchema: Schema = new Schema({
  envelope_id: { type: String, required: true },
  is_active: { type: Boolean, required: true, default: false },
  sender_id: { type: String, required: true },
  sender_email: { type: String, required: true },
  recipients_emails: { type: [String], required: true },
  obligatory_score: { type: Number },
  obligations: {
    type: [
      {
        obligation_statement: { type: String },
        importance_level: { type: Number },
        responsible_party_role_name: { type: String },
      },
    ],
    default: [],
  },
  events: {
    type: [
      {
        start_date: { type: String },
        end_date: { type: String },
        description: { type: String },
        recurring: { type: String },
      },
    ],
    default: [],
  },
  signed_on: { type: Date },
  ics_data: { type: String },
  knowledge_graph_db_name: { type: String },
  agreements: { type: [String], required: true },
});

// Create the model
const Envelope = mongoose.model<IEnvelope>('Envelope', EnvelopeSchema);

export default Envelope;
