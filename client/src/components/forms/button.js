const Button = ({ className, type, children, onClick, colorClass }) => {
  return (
    <button
      className={`${colorClass} text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-opacity duration-700 opacity-100 hover:opacity-60 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
