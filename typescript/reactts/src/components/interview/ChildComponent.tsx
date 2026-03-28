import type { Dispatch, SetStateAction } from "react";

interface ValidateChildComponent {
  isShow: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
const ChildComponent = ({ isShow, setShow }: ValidateChildComponent) => {
  return (
    <div>
      {isShow && <div>This is the content</div>}
      <button onClick={() => setShow(!isShow)}>Show/hide</button>
    </div>
  );
};

export default ChildComponent;
