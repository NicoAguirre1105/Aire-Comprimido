export default function ServiceCard({
    children, 
    title,
    buttonText
}: {
    children: React.ReactNode, 
    title: string, 
    buttonText: string
}) {
    return (
    <div className="card">
        <h3>{title}</h3>
        {children}
        <button>{buttonText}</button>
    </div>
    )
}