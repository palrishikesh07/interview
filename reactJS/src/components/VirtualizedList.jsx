import React from "react";
import { List, AutoSizer } from "react-virtualized";
// import "react-virtualized/styles.css";

const items = Array.from({ length: 1300000 }, (_, i) => `Item ${i + 1}`);

const rowRender = ({ style, index, key }) => {
  console.log({ index, key, style });
  return (
    <div
      key={key}
      style={{
        ...style,
        marginTop: "10px",
        borderBottom: "1px solid #9c3737ff",
      }}
    >
      Row {items[index]}
    </div>
  );
};

export default function VirtualizedList() {
  return (
    <div style={{ height: "400px" }}>
      {/* Normal Approach */}
      {/* {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))} */}
      {/* 
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={items.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer> */}

      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={items.length}
            rowHeight={40}
            rowRenderer={rowRender}
          ></List>
        )}
      </AutoSizer>
    </div>
  );
}
