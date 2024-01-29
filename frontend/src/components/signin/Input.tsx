interface InputProps {
  label: string;
  placeholder: string;
  inputId: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type ?: string
}
const Input = ({ label, placeholder, inputId, value, onChange, type }: InputProps) => {
   return <div className="mb-6">
    <div className="mb-6">
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-black dark:text-black align text-left"
      >
        {label}
      </label>
      <input
        type={type ? type :"text"}
        id={inputId}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        autoCapitalize="off"
        autoComplete="off"
        className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  </div>;
};

export default Input;
