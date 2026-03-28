import React, { useRef } from "react";

const FormRef = () => {
  const formElement = useRef<HTMLFormElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);
  console.log(formElement, emailInput, submitButton);
  return (
    <div>
      <h2>Form</h2>
      <form ref={formElement}>
        <input type="email" placeholder="Email" ref={emailInput} />
        <button type="submit" ref={submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRef;
