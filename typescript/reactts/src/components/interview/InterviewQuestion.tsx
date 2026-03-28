import { useState } from "react";
import ChildComponent from "./ChildComponent";
import FormRef from "./FormRef";
import Promise from "./Promise";

const InterviewQuestion = () => {
  const [isShow, setShow] = useState<boolean>(false);
  return (
    <div>
      <h2>Interview Question</h2>
      <ChildComponent isShow={isShow} setShow={setShow} />
      <FormRef />
      <Promise />
    </div>
  );
};

export default InterviewQuestion;
