import Link from "next/link"
export default function Links({
    children,
    variant = "primary",
    className = "",
    ...props
}){
    const variants = {
        primary: "hover:text-[#008DFF]",
        danger: "hover:text-red"
    }
    return(
        <Link 
            className={`${variants[variant]} ${className}`}
            {...props}>
                {children}
         </Link>
    )
}