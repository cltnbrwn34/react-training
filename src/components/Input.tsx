import React from "react";
import { InputProps } from "../types/InputProps";

export function Input({
  label,
  id,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input onChange={onChange} id={id} type={type} value={value} />
    </div>
  );
}
//alternative defaultProps approach
// Input.defaultProps = {
//   type: "number",
// };
