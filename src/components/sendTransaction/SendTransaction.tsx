import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./SendTransaction.css";
import { FaEthereum } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function SendTransaction() {
  const {
    formData,
    setFormData,
    confirmTransaction,
    sendTransaction,
    getHistory,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendTransaction();
    getHistory();
  };

  useEffect(() => {
    if (confirmTransaction) {
      navigate("/success", { replace: true });
    }
  }, [confirmTransaction, navigate]);

  return (
    <div className="sendTX container">
      <div className="header">
        <div className="logo">
          <FaEthereum />
        </div>
        <div className="app_name">
          <h2>KRYPTON</h2>
        </div>
        <button className="header_btn" style={{ fontSize: "18px" }}>
          <IoMdArrowRoundBack
            onClick={() => navigate("/", { replace: true })}
          />
        </button>
      </div>

      <div className="form_body">
        <h3>Add Recipient</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Public Address"
            value={formData.addressTo}
            onChange={(e) =>
              setFormData({ ...formData, addressTo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </form>
      </div>

      <div className="form_footer">
        <button
          className="general_btn cancel"
          onClick={() => navigate("/", { replace: true })}
        >
          Cancel
        </button>
        <button
          className="general_btn"
          onClick={handleSubmit}
          disabled={!formData.addressTo}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SendTransaction;
