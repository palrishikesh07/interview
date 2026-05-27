import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);


  const callRangeFunction=(value)=>{
    // setValue(value);
    console.log("Range function called with value: ", value);
  }

  const debounceFn = (func,delay)=>{
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this,args);
        },delay)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue);
    debounceFn(callRangeFunction, 2000)(newValue);
  
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// function valuetext(value) {
//   return `${value}°C`;
// }

// // 1. Keep the utility function outside the component
// const debounceFn = (func, delay) => {
//   let timer;
//   const debounced = function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
  
//   // Attach a cancel method to clear memory leaks on unmount
//   debounced.cancel = () => clearTimeout(timer);
//   return debounced;
// };

// export default function RangeSlider() {
//   const [value, setValue] = React.useState([20, 37]);

//   // 2. Wrap your API call / heavy logic in useCallback
//   const callRangeFunction = React.useCallback((currentValue) => {
//     console.log("Range function called with value: ", currentValue);
//   }, []);

//   // 3. Create a single, stable instance of the debounced function
//   const debouncedCallRange = React.useMemo(
//     () => debounceFn(callRangeFunction, 2000),
//     [callRangeFunction]
//   );

//   // 4. Clean up any active timers if the component unmounts
//   React.useEffect(() => {
//     // return () => {
//     //   debouncedCallRange.cancel();
//     // };
//   }, [debouncedCallRange]);

//   // 5. Handle immediate UI updates alongside the debounced action
//   const handleChange = (event, newValue) => {
//     setValue(newValue);         // Slider stays smooth and responsive
//     debouncedCallRange(newValue); // Debounce waits for the user to stop dragging
//   };

//   return (
//     <Box sx={{ width: 300, padding: 4 }}>
//       <Slider
//         getAriaLabel={() => 'Temperature range'}
//         value={value}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//       />
//     </Box>
//   );
// }