import mongoose, { Schema, Document } from "mongoose";

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

interface IAgreement {
  file_name: string;
  file_uri: string;
}

// Define the interface for TypeScript type safety
export interface IEnvelope extends Document {
  envelope_id: string;
  is_active: boolean;
  sender_id: string;
  sender_email: string;
  recipients_emails: string[];
  obligation_score?: number;
  obligations?: IObligation[];
  events?: IEvent[];
  signed_on?: number;
  ics_data?: string;
  knowledge_graph_db_name?: string;
  agreements: IAgreement[];
  ai_processing_complete: boolean;
}

// Define the schema
const EnvelopeSchema: Schema = new Schema({
  envelope_id: { type: String, required: true },
  is_active: { type: Boolean, required: true, default: false },
  sender_id: { type: String, required: true },
  sender_email: { type: String, required: true },
  recipients_emails: { type: [String], required: true },
  compliance_obligatory_score: { type: Number },
  obligations: {
    type: [
      {
        obligation_statement: { type: String },
        importance_level: { type: Number },
        responsible_party_role_name: { type: String },
        document_name: { type: String },
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
        document_name: { type: String },
      },
    ],
    default: [],
  },
  signed_on: { type: Number },
  ics_data: { type: String },
  agreements: {
    type: [
      {
        file_name: { type: String },
        file_uri: { type: String },
      },
    ],
    required: true,
  },
  ai_processing_complete: { type: Boolean, required: true, default: false },
});

// Create the model
const Envelope = mongoose.model<IEnvelope>("Envelope", EnvelopeSchema);

export default Envelope;
