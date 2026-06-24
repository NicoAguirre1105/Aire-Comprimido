import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <>
      <header className="fixed top-0 w-full bg-light-blue flex h-16 px-10 py-2.5 z-50 max-sm:px-5 gap-2">
        <Link href="/">
          <Image
            src="/logos/logo.png"
            alt="AireComprimido EC S.A.S"
            width={1383}
            height={1598}
            className="h-full w-auto"
            priority
          />
        </Link>
        <h2 className="text-white text-xs font-medium self-end">AireComprimido Ec S.A.S</h2>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center gap-6">
        <p className="text-8xl font-bold text-light-blue max-sm:text-6xl">404</p>
        <h1 className="text-3xl font-bold text-dark-blue max-sm:text-2xl">
          Página no encontrada
        </h1>
        <p className="text-dark-blue/60 max-w-md">
          La página que buscás no existe o el enlace es incorrecto.
        </p>
        <Link
          href="/"
          className="mt-4 bg-light-blue text-white font-semibold px-8 py-3 rounded-sm hover:bg-dark-blue transition-colors duration-200"
        >
          Ir al inicio
        </Link>
      </main>
    </>
  )
}
