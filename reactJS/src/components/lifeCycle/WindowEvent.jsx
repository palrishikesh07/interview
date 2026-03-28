//“How do you bind an event on component mount and remove it on unmount?”
import React, { useEffect } from "react";

// const WindowEvent = () => {
//   const handleSize = () => {
//     console.log("Window resized: ", window.innerHeight);
//   };

//   useEffect(() => {
//     window.addEventListener("resize", handleSize);

//     return () => {
//       console.log("Removing");
//       window.removeEventListener("resize", handleSize);
//     };
//   }, []);
//   return <div>WindowEvent</div>;
// };

// const WindowEvent = () => {
//   const handleClick = () => {
//     console.log("Click is presed");
//   };
//   useEffect(() => {
//     const btn = document.getElementById("btn");
//     btn.addEventListener("click", handleClick);

//     return () => {
//       console.log("Removed");
//       btn.removeEventListener("click", handleClick);
//     };
//   }, []);
//   return (
//     <div>
//       <button id="btn">Click</button>
//     </div>
//   );
// };

const WindowEvent = () => {
  /*
  const handleEvent = (e) => {
    console.log(e.key);
    if (e.key == "Escape") {
      console.log("Escape press");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);
    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, []);

  return (
    <div>
      <button id="btn">Click</button>
    </div>
  );

  */
  useEffect(() => {
    console.log("Effect executed");

    return () => {
      console.log("Cleanup executed");
    };
  }, []);

  return <h1>Hello React</h1>;
};

export default WindowEvent;
