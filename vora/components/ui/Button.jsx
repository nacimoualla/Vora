export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}){
    const baseStyle = "flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300";
    const variants = {
    primary: "bg-[#008DFF] text-white hover:bg-blue-600 py-4 px-8",
    outline: "border-2 border-gray-200 text-gray-900 hover:border-gray-900 py-4 px-8",
    icon: "w-14 h-14 border border-gray-200 text-gray-900 hover:border-gray-900 p-0" // The square Wishlist button
  };
  return (
    <button
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
    >
        {children}
    </button>
  )
}