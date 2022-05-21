import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { isValidAddress } from "../../libs/utils";
import "./SendTransaction.scss";

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

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    await sendTransaction();
    getHistory();
    setLoading(false);
  };

  useEffect(() => {
    if (confirmTransaction) {
      navigate("/success", { replace: true });
    }
  }, [confirmTransaction, navigate]);

  return (
    <div className="send-transaction container">
      <Header />
      <div className="form-container">
        <h3>Add Recipient</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Public Address"
              value={formData.addressTo}
              onChange={(e) => {
                setFormData({ ...formData, addressTo: e.target.value });
              }}
            />
            {formData.addressTo && !isValidAddress(formData.addressTo) && (
              <small className="text-danger">
                Please enter a valid Ethereum address.
              </small>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>
        </form>
      </div>

      <div className="action-buttons">
        <button
          className="btn-primary text-danger"
          onClick={() => navigate("/", { replace: true })}
        >
          Cancel
        </button>
        <button
          className="btn-primary"
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
