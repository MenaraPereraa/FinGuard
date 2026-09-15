export type TransactionStatus = "APPROVED" | "FLAGGED" | "BLOCKED";

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  riskScore: number;
  status: TransactionStatus;
  timestamp: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx_01",
    merchant: "ElectroMart Online",
    amount: 1500.0,
    currency: "USD",
    riskScore: 12,
    status: "APPROVED",
    timestamp: new Date().toISOString(),
  },
  {
    id: "tx_02",
    merchant: "Luxury Watches Inc",
    amount: 9850.5,
    currency: "USD",
    riskScore: 89,
    status: "BLOCKED",
    timestamp: new Date().toISOString(),
  },
  {
    id: "tx_03",
    merchant: "Cloud Services LLC",
    amount: 450.0,
    currency: "USD",
    riskScore: 45,
    status: "FLAGGED",
    timestamp: new Date().toISOString(),
  },
];