const Title = ({ className, children }) => {
  return (
    <div className={`text-center`}>
      <h3
        className={`text-white text-3xl font-bold animate-bounce inline-block border-b-4 border-red-500 ${className}`}
      >
        {children}
      </h3>
    </div>
  );
};

export default Title;
