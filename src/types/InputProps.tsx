export type InputProps = {
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "number" | "email" | "phone" | "date";
};
