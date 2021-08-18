type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  placeholderOption: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

//destructured props in signature to avoid pros.something all over code
export function Select({
  placeholderOption,
  value,
  options,
  onChange,
  id,
  label,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <select id={id} onChange={onChange} value={value}>
        <option value="">{placeholderOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
