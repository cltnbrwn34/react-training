import { SelectProps } from "../types/SelectProps";

export function InputSelector(props: SelectProps) {
  return (
    <select>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
