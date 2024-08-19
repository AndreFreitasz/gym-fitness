import { Field } from 'formik';

const InputField = ({ label, name, id, className, type, placeholder, autoComplete }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-white text-sm font-semibold mb-4">{label}</label>}
      <Field
        name={name}
        id={id}
        className={`appearance-none rounded w-full p-3 text-white leading-tight focus:outline-none bg-[#1B2735] autofill:bg-[#1B2735] autofill:text-white ${className}`}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default InputField;