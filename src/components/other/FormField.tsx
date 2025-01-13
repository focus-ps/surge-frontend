import Select, { ActionMeta, MultiValue } from "react-select";

interface FormFieldProps {
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "select"
    | "multiselect";
  value?: string | number | string[];
  options?: { label: string; value: string | number }[];
  required?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (value: string | number | string[]) => void;
}

export function FormField({
  label,
  type = "text",
  value,
  options,
  required,
  className = "",
  placeholder,
  onChange,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="text-sm text-gray-500">
        {label} {required && "*"}
      </label>
      {type === "multiselect" ? (
        <Select
          isMulti
          options={options}
          onChange={(
            selected: MultiValue<any>,
            actionMeta: ActionMeta<any>
          ) => {
            onChange?.(selected.map((option) => option.value));
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      ) : type === "select" ? (
        <select
          className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          value={value}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
        >
          <option value="" className="text-gray-400">
            Select {label.toLowerCase()}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          readOnly
        />
      )}
    </div>
  );
}
