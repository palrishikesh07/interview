import React from "react";
import { useRef } from "react";

const OTP = ({ length = 6 }) => {
  const inputRef = useRef([]);

  const handleChnage = (e, index) => {
    const value = e.target.value;

    const numberRegex = /^\d*$/;
    if (!numberRegex.test(value)) {
      return true;
    }
    if (value && index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    console.log(pasteData);
    const numberRegex = /^\d*$/;
    if (!numberRegex.test(pasteData)) {
      return true;
    }
    const pasteDataArray = pasteData.split("");
    console.log(pasteDataArray);
    pasteDataArray.forEach((dataValue, index) => {
      inputRef.current[index]
        ? (inputRef.current[index].value = dataValue)
        : null;
    });
    const lastIndex = inputRef.current.length - 1;
    console.log("lastIndex: ", lastIndex);
    if (lastIndex) {
      inputRef.current[lastIndex].focus();
    }
  };

  const getOTP = () => {
    const otp = inputRef.current.map((element) => element.value).join("");
    console.log(otp);
    // inputRef.current.forEach((element) => {
    //   console.log(element.value);
    // });
  };
  return (
    <div className="container">
      {Array.from({ length }).map((_, index) => (
        <input
          ref={(el) => {
            inputRef.current[index] = el;
          }}
          key={index}
          type="text"
          maxLength={1}
          onChange={(e) => handleChnage(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "20px",
          }}
        />
      ))}
      <button onClick={getOTP}>Submit</button>
    </div>
  );
};

export default OTP;
