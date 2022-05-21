export interface useGlobalInterface {
  address: string;
  accountBalance: number;
  history: any[];
  formData: any;
  confirmTransaction: any;
  hash: any;
  connectWallet: () => Promise<void>;
  getHistory: () => void;
  setFormData: (data: any) => void;
  setConfirmTransaction: (data: any) => void;
  sendTransaction: () => Promise<void>;
}

export interface Transaction {
  txType: string;
  amount: string;
  date: string;
  time: string;
  address: string;
  fiatAmount: string;
}
