import React from "react";
import Grass from "./Grass";

 function World() {
  return (
    <React.Suspense fallback={null}>
      <Grass />

    </React.Suspense>
  )
 }

export default World;