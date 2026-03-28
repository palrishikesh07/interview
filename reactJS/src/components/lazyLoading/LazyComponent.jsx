import React, { lazy, Suspense } from "react";
import LoadData from "./LoadData";
const LazyLoadData = lazy(() => import("./LoadData"));

const LazyComponent = () => {
  return (
    <div>
      <p>LazyComponent</p>
      <Suspense fallback={<p>Loading...</p>}>
        <LazyLoadData />
      </Suspense>
    </div>
  );
};

export default LazyComponent;
