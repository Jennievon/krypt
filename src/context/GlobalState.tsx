import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useGlobalInterface, Transaction } from "../libs/types";
import { TransactionsService } from "../services";

// Create context
// @ts-ignore
export const GlobalContext = createContext<useGlobalInterface>({});

export const GlobalProvider = ({ children }: any) => {
  // States
  const [address, setAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [formData, setFormData] = useState<{
    addressTo: string;
    amount: string;
  }>({
    addressTo: "",
    amount: "",
  });

  const [history, setHistory] = useState<Transaction[]>([]);
  const [confirmTransaction, setConfirmTransaction] = useState(null);
  const [hash, setHash] = useState({});

  // variables
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();

  // Functions
  const connectWallet = async () => {
    try {
      if (typeof (window as any).ethereum === "undefined") {
        return;
      } else {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let currentAddress = await signer.getAddress();
        setAddress(currentAddress);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getAddress = async () => {
    if (typeof (window as any).ethereum === "undefined") {
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      let currentAddress = await signer.getAddress();
      setAddress(currentAddress);
    }
  };

  const handleAccountChange = () => {
    if (typeof (window as any).ethereum === "undefined") {
      return;
    } else {
      (window as any).ethereum.on("accountsChanged", (accounts: any) => {
        if (accounts.length > 0) {
          getAddress();
        } else {
          setAddress("");
        }
      });
    }
  };

  const getBalance = async () => {
    try {
      if (typeof (window as any).ethereum === "undefined") {
        return;
      } else {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        let balance: any = await provider.getBalance(address);
        balance = parseFloat(ethers.utils.formatEther(balance));

        setAccountBalance(balance.toFixed(2));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const { addressTo, amount } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);

      const tx = await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const confirmedTX: any = await provider.getTransaction(tx);
      setConfirmTransaction(confirmedTX);
      setHash(confirmedTX);
      setFormData({ ...formData, addressTo: "", amount: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const getHistory = () => {
    const newTransaction: Transaction = {
      txType: "Sent Ether",
      amount: formData.amount,
      date,
      time,
      address,
      dollarAmount: (Number(formData.amount) * 2016.14).toFixed(2),
    };

    if (formData.addressTo === "" || formData.amount === "") {
      return;
    }

    setHistory([newTransaction, ...history]);

    TransactionsService.addTransaction(newTransaction, history);
  };

  useEffect(() => {
    getAddress();
    handleAccountChange();
    getBalance();
  });

  return (
    <GlobalContext.Provider
      value={{
        address,
        accountBalance,
        history,
        formData,
        confirmTransaction,
        hash,
        connectWallet,
        getHistory,
        setFormData,
        setConfirmTransaction,
        sendTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
