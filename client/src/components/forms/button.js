const Button = ({ className, type, children}) => {
    return (
        <button 
          className={`bg-red-500 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-50 focus:outline-none focus:shadow-outline transition-opacity ${className}`} 
          type={type}
        >
          {children}
        </button>
      );
  }
  
  export default Button;