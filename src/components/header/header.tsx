import React, { useContext } from "react";
import { FaEthereum } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiPower } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

export const Header = () => {
  const { address, connectWallet } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="logo">
        <FaEthereum />
      </div>
      <div className="app_name">
        <h2>KRYPT</h2>
      </div>
      {!address ? (
        <button className="header_btn" onClick={connectWallet}>
          <FiPower />
        </button>
      ) : pathname === "/" ? (
        <div className="user">
          <FaRegUserCircle />
        </div>
      ) : (
        <button className="header_btn" style={{ fontSize: "18px" }}>
          <IoMdArrowRoundBack
            onClick={() => navigate("/", { replace: true })}
          />
        </button>
      )}
    </div>
  );
};
