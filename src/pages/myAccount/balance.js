import React, { useState } from "react";
import DashboardLayout from "../../componet/DashboardLayout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import "./balance.css";

function Balance() {
  const [show, setShow] = useState(true);
  const toggleHiddenSection = () => {
    setShow(!show);
  };

  const [data, setData] = useState({
    email: "",
    amount: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  // const [balValue, setBalValue] = useState("0");
  const [balValue, setBalValue] = useState(
    localStorage.getItem("balValue") || "0"
  );
  let post = async (body) => {
    try {
      const response = await fetch(
        "https://adorable-puce-quail.cyclic.app//api/v1/user/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((rep) => {
          console.log(rep); // Handle the response as per your application's requirements
          toast.success(rep, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "colored",
          });
          // setBalValue(rep);
          // console.log(balValue);

          setBalValue(rep); // Update balValue state with the response value
          localStorage.setItem("balValue", rep); // Store balValue in localStorage
          console.log(balValue);
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBalance = (e) => {
    e.preventDefault();

    if (data.email.trim() === "") {
      return toast.error("please fill all information", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
        theme: "colored",
      });
    } else if (data.amount.trim() === "") {
      return toast.error("please fill all information", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
        theme: "colored",
      });
    }
    setData({
      email: "",
      amount: "",
    });

    post(data);
    console.log(data);
  };

  return (
    <div className="containerBalanceSec">
      <DashboardLayout>
        <div className="balance-page">
          <div className="balance-description">
            <p className="balance-intro">
              Please be informed that your account balance is currently zero. To
              kickstart your savings, simply click on the "Save" button and
              start building your funds.
            </p>
          </div>
          <div className="balance-amount">
            <p className="balance-par">
              Amount: <span id="totalbalance">{balValue}</span>
            </p>
          </div>
          <div className="balance-btn">
            {" "}
            <button onClick={toggleHiddenSection}>Start saving</button>
            <br />
          </div>
          {!show && (
            <div className="balance-show">
              <div className="balance-form-btn">
                <form>
                  <input
                    type="number"
                    placeholder="Amount to be saved"
                    name="amount"
                    onChange={handleChange}
                    value={data.amount}
                  />
                  <br />
                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                  />
                  <input
                    type="submit"
                    value="SAVE"
                    id="balance-btn"
                    onClick={handleBalance}
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
      <ToastContainer />
    </div>
  );
}

export default Balance;
