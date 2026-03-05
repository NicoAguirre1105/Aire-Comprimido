import Image from "next/image"

export default function Header({
  title,
  toggleAside
}: {
  title: string,
  toggleAside: () => void
}) {
  return(
    <div className="bg-(--dark-blue) fixed md:relative top-0 w-full h-fit flex items-center text-white px-5 py-4 gap-7 sm:px-10 sm:gap-12 md:bg-white md:text-(--dark-blue) md:pt-10 md:pl-20 z-40">
      <Image
        src="/icons/menu.svg"
        alt="Menu icon"
        width={150}
        height={150}
        className="h-10 w-auto cursor-pointer md:hidden"
        onClick={toggleAside}
      />
      <h1 className="text-2xl font-semibold md:text-4xl md:font-semibold">{title}</h1>
    </div>
  )
}