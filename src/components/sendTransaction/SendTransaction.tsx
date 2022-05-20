import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ImSpinner2 } from "react-icons/im";
import "./SendTransaction.css";
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    sendTransaction();
    getHistory();
    setLoading(false);
  };

  useEffect(() => {
    if (confirmTransaction) {
      navigate("/success", { replace: true });
    }
  }, [confirmTransaction, navigate]);

  return (
    <div className="sendTX container">
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
            placeholder="Enter amount"
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
          {loading ? <ImSpinner2 className="spinner" /> : "Next"}
        </button>
      </div>
    </div>
  );
}

export default SendTransaction;
