import React from "react";
import ReactLoading from "react-loading";

export const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={"3%"} width={"3%"} />
);
