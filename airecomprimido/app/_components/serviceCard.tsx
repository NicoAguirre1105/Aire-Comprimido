import Link from "next/link"

export default function ServiceCard({
    children, 
    title,
    buttonText,
    link
}: {
    children: React.ReactNode, 
    title: string, 
    buttonText: string
    link: string
}) {
    const buttonStyle = "text-center py-2 px-5 rounded-4xl font-bold hover:cursor-pointer transition-all duration-300 bg-(--grey-blue) text-(--dark-blue) hover:bg-(--dark-blue) hover:text-white"

    return (
    <div className="flex flex-col justify-between items-center rounded-xl shadow-[2px_2px_20px_15px_#ddd] max-w-80 bg-white px-5 py-10 gap-5">
        <h3 className="text-(--dark-blue) text-center font-bold text-xl">{title}</h3>
        <p className="px-5 text-center font-light">{children}</p>
        <Link className={buttonStyle} href={link}>{buttonText}</Link>
    </div>
    )
}