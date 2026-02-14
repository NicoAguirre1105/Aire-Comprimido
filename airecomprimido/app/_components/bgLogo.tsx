import Image from "next/image"

export default function BgLogo() {
  return (
    <Image
      src="/logos/logo_black.png"
      alt="AIRECOMPRIMIDO EC logo"
      width={150}
      height={150}
      className="fixed -z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-7 w-80"
    />
  )
}