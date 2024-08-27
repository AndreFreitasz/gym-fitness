const Title = ({ className, children }) => {
    return (
        <div className={`mt-14 mb-5 text-center ${className}`}>
            <h3 className="text-white text-3xl font-bold animate-bounce inline-block border-b-4 border-red-500">
                {children}
            </h3>
        </div>
    );
}

export default Title;