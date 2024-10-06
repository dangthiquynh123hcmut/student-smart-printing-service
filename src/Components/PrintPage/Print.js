import { colors } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import React from "react";
import "./Print.css";
function Print() {
  return (
    <div>
      <h1>Print</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Print;
