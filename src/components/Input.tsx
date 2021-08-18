import React from "react";
import { InputProps } from "../types/InputProps";

export function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input id={props.id} type={props.inputType} />
    </div>
  );
}
