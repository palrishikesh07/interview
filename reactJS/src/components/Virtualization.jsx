// import React from "react";
// import { FixedSizeList as List } from "react-window";
// // const items = Array.from({ length: 13000 }, (_, i) => `Item ${i + 1}`);

// const Row = ({ index, style }) => {
//   return <div style={{ ...style }}>Row {index}</div>;
// };

// const Virtualization = () => {
//   return (
//     <div>
//       <h2>Virtualization</h2>
//       {/* <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul> */}

//       <List height={400} itemCount={100000} itemSize={35} width={300}>
//         {Row}
//       </List>
//     </div>
//   );
// };

// export default Virtualization;

import { List, AutoSizer } from "react-virtualized";

const rowRenderer = ({ index, key, style }) => {
  return (
    <div
      key={key}
      style={{
        ...style,
        padding: "10px",
      }}
    >
      Row {index}
    </div>
  );
};

// import "react-virtualized/styles.css";
const Virtualization = () => {
  return (
    <div style={{ height: "400px" }}>
      <AutoSizer>
        {({ width, height }) => {
          <List
            width={width}
            height={height}
            rowCount={100000}
            rowHeight={50}
            rowRenderer={rowRenderer}
          />;
        }}
      </AutoSizer>
    </div>
  );
};

export default Virtualization;
