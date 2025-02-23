export interface Member {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  demographics: string;
  financialInfo: string;
}

export interface FinancialStats {
  monthlyRecords: any[];
  metrics: any;
  verascore: number;
} 