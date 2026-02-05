export default function ProductCard({
  children, 
}:{
  children: React.ReactNode,  
}){
  return(
    <div className="bg-white text-(--dark-blue)
        flex gap-7 p-6 rounded-2xl
        w-full max-w-3xl
        min-h-[220px]
        items-center">
      {children}
    </div>
  )  
}