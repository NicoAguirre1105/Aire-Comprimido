export default function ProductCard({
  children, 
}:{
  children: React.ReactNode,  
}){
  return(
    <div className="bg-white text-(--dark-blue)
        flex gap-7 p-6 rounded-2xl mx-5 shadow-[2px_2px_20px_15px_#ddd]
        w-4/5 max-w-200 border-3 border-(--dark-blue)
        items-center max-md:flex-col">
      {children}
    </div>
  )  
}