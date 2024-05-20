const InputField = ({name, id, className, type, placeholder, autoComplete}) => {
    return (
      <input 
        name={name} 
        id={id} 
        className={`shadow appearance-none rounded w-full p-2 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#1B2735] ${className}`}  
        type={type} 
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    );
  }
  
  export default InputField;