import Select, { MultiValue } from "react-select";

interface FormFieldProps {
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "select"
    | "multiselect"
    | "textarea"
    | "toggleGroup";
  value?: string | number | string[];
  options?: { label: string; value: string | number }[];
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number; // Added rows prop for textarea
  onChange?: (value: string | number | string[]) => void;
}

export function FormField({
  label,
  type = "text",
  value = "",
  options,
  required,
  className = "",
  placeholder,
  rows = 4,
  onChange,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="text-sm text-gray-500">
        {label} {required && "*"}
      </label>
      {type === "toggleGroup" ? (
        <div className="flex gap-2 mt-1">
          {options?.map((option) => {
            const isSelected = value?.toString() === option.value.toString();
            return (
              <button
                key={option.value}
                onClick={() => onChange?.(option.value)}
                className={`
                   px-8 py-3 rounded-lg text-sm transition-colors min-w-fit
                   ${
                     isSelected
                       ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                   }
                 `}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : type === "textarea" ? (
        <textarea
          value={value?.toString() || ""}
          placeholder={placeholder}
          rows={rows}
          className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : type === "multiselect" ? (
        <Select
          isMulti
          options={options}
          onChange={(selected: MultiValue<any>) => {
            onChange?.(selected.map((option) => option.value));
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      ) : type === "select" ? (
        <select
          className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          value={value?.toString() || ""}
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
          value={value?.toString() || ""}
          placeholder={placeholder}
          className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
}
