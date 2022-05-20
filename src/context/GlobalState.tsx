import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useGlobalInterface } from "../libs/types";

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
  const [history, setHistory] = useState([]);
  const [confirmTransaction, setConfirmTransaction] = useState(null);
  const [hash, setHash] = useState({});

  useEffect(() => {
    const oldHistory = JSON.parse(localStorage.getItem("history") || "[]");
    const filteredHistoryByAddress = oldHistory.filter(
      (item: any) => item.address === address
    );
    setHistory(filteredHistoryByAddress);
  }, [address]);

  // vaiables
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();

  // Functions
  const connectWallet = async () => {
    try {
      // @ts-ignore
      if (typeof window.ethereum === "undefined") {
        return;
      } else {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    // @ts-ignore
    if (typeof window.ethereum === "undefined") {
      return;
    } else {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let currentAddress = await signer.getAddress();

      setAddress(currentAddress);
    }
  };

  const handleAccountChange = () => {
    // @ts-ignore
    if (typeof window.ethereum === "undefined") {
      return;
    } else {
      // @ts-ignore
      window.ethereum.on("accountsChanged", (accounts) => {
        getAddress();
      });
    }
  };

  const getBalance = async () => {
    try {
      // @ts-ignore
      if (typeof window.ethereum === "undefined") {
        return;
      } else {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { addressTo, amount } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);

      // @ts-ignore
      const tx = await window.ethereum.request({
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
    const newTransaction: any = {
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

    // @ts-ignore
    setHistory([newTransaction, ...history]);

    const newHistory: any = [newTransaction, ...history];
    localStorage.setItem("history", JSON.stringify(newHistory));
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
