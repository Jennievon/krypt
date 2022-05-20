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
