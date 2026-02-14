import Image from "next/image"

export default function Loader() {
  return (
    <div className="flex min-h-full flex-1">
      <Image
        src="/logos/logo_black.png"
        alt="AIRECOMPRIMIDO EC logo"
        width={150}
        height={150}
        className="loader-animation w-50 h-auto m-auto"
      />
    </div>
  )
}