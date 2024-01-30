
interface InputProps {
  label: string;
  placeholder: string;
  inputId: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLElement>) => void
  isValueValid: boolean
  type ?: string
}
const Input = ({ label, placeholder, inputId, value, onChange, type, onBlur, isValueValid }: InputProps) => {
   return <div className="mb-6">
    <div className="mb-6">
      <label
        htmlFor="default-input"
        className={`block mb-2 text-sm font-medium ${isValueValid ? "text-red-500 dark:text-red-500" : "text-black dark:text-black"} align text-left`}
      >
        {label}
      </label>
      <input
        type={type ? type :"text"}
        id={inputId}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        autoCapitalize="off"
        autoComplete="off"
        className={`${isValueValid ? "bg-rose-950 border border-pink-300" : "bg-gray-50 border border-gray-300"} text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${isValueValid ? "dark:bg-rose-950 dark:border-pink-300" : "dark:bg-white dark:border-gray-600"} dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
      {isValueValid && <p className="text-red-500 text-left text-sm">{`Entered ${label} not valid`}</p>}
    </div>
  </div>;
};

export default Input;
