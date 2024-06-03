import { Field } from 'formik';
const InputField = ({name, id, className, type, placeholder, autoComplete}) => {
    return (
      <Field 
        name={name} 
        id={id} 
        className={`shadow-lg appearance-none rounded w-full p-2 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#1B2735] autofill:bg-[#1B2735] autofill:text-white ${className}`}  
        type={type} 
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    );
  }
  
  export default InputField;