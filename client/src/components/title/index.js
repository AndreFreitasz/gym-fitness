const Title = ({className, children}) => {
    return (
        <h3 className={`text-white text-3xl mt-14 mb-5 p-4 font-bold text-center animate-bounce border-b-4 border-red-500 ${className}`}>
            {children}
        </h3>
    )
}

export default Title;