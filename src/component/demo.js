import React from "react";
import useCustom from "../hooks/useCustom";

const demo = () => {
  const value = useCustom("Hello World");
  return <div>{value}</div>;
};

export default demo;
