import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Home.css";

function Home() {
  const { address, accountBalance, history } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [dollarBallance, setDollarBalance] = useState(0);

  const handleDollarBalChange = useCallback(() => {
    setDollarBalance(accountBalance * 2016.14);
  }, [accountBalance]);

  useEffect(() => {
    handleDollarBalChange();
  }, [accountBalance, handleDollarBalChange]);

  return (
    <div className="home container">
      {!address ? (
        <>
          <h3 style={{ margin: "0 1.5rem 1rem", color: "#fff" }}>
            Please connect to Metamask.
          </h3>
          <h3 style={{ margin: "0 1.5rem", color: "grey", fontSize: "14px" }}>
            If you do not have Metamask installed, kindly follow the{" "}
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "#02f0a1" }}
            >
              link
            </a>{" "}
            to download it.
          </h3>
        </>
      ) : (
        <>
          <div className="assets_wrapper">
            <div className="assets">
              <h3>
                Address:{" "}
                {`${address.slice(0, 6)}...${address.slice(
                  address.length - 4
                )}`}
              </h3>
              <h3>
                <span>{accountBalance} ETH</span>
              </h3>
              <p>{`$${dollarBallance.toFixed(2)}`} USD</p>
            </div>
          </div>

          <div className="open_form_wrapper">
            <button
              className="general_btn"
              onClick={() => navigate("/send-transaction")}
            >
              Send Ether
            </button>
          </div>

          <div className="history">
            {history.map((item, index) => (
              <div className="transaction" key={index}>
                <div className="txType_and_time">
                  <h4>Sent Ether</h4>
                  <p>
                    {item.date} {item.time}
                  </p>
                </div>
                <div className="amount">
                  <h4>-{item.amount} ETH</h4>
                  <p>-${item.dollarAmount} USD</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
