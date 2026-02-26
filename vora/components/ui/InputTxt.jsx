export default function Input({
    children,
    type = "text",
    className = "",
    ...props
}){
    const baseStyle = "p-3 flex items-center rounded-xl font-medium"
    return(
        <input type={`${type}`} className={`${baseStyle} ${className}`} placeholder={`${children}`} {...props}/>
    )
}