export interface Obligation {
  obligation_statement: string;
  responsible_party_role_name: string;
}

export interface ProcessedData {
  role: string;
  count: number;
  obligations: string[];
  color: string;
  startAngle: number;
  endAngle: number;
}
