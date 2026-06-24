import Image from "next/image"
import equipos from "@/public/equipos.json"
import { FadeIn } from "../_components/FadeIn"
import { Marquee } from "@/components/ui/marquee"

interface ProductProp {
  title: string
  description: string
}

interface Product {
  id: number
  name: string
  src: string
  props: ProductProp[]
}

const brands = [
  { src: '/logos/airhorse.svg', alt: 'Airhorse' },
  { src: '/logos/quincy.svg', alt: 'Quincy' },
  { src: '/logos/atlas_copco.svg', alt: 'Atlas Copco' },
  { src: '/logos/hertz.svg', alt: 'Hertz' },
  { src: '/logos/kaeser.svg', alt: 'Kaeser' },
  { src: '/logos/IR_logo.svg', alt: 'Ingersoll Rand' },
]

export default function Equipos() {
  const productList = equipos as Product[]

  return (
    <main className="overflow-x-hidden">

      {/* Hero */}
      <section className="bg-[var(--dark-blue)] py-20 px-6 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--light-blue) 1px, transparent 1px), linear-gradient(90deg, var(--light-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
            Catálogo
          </p>
          <h1 className="text-5xl font-bold text-white mb-4 max-sm:text-4xl">
            Equipos y Compresores
          </h1>
          <p className="text-slate-300 text-lg font-light max-w-3xl mx-auto">
          Comercializamos compresores industriales de las marcas líderes a nivel mundial, importados directamente de fábrica. Respaldamos cada equipo con suministro garantizado de repuestos y piezas para asegurar su operación continua.
          </p>
        </div>

        {/* Brand marquee */}
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:28s] [--gap:3rem]" repeat={3}>
            {brands.map((b) => (
              <div key={b.alt} className="flex items-center justify-center px-6">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--dark-blue)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--dark-blue)]" />
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {productList.map((product, i) => (
              <FadeIn key={product.id} delay={(i % 3) * 0.08}>
                <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <Image
                      src={product.src}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-lg font-semibold text-[var(--dark-blue)] mb-4 leading-snug">
                      {product.name}
                    </h2>
                    <dl className="flex flex-col gap-2 flex-1">
                      {product.props.map((prop) => (
                        <div key={prop.title} className="grid grid-cols-[auto_1fr] gap-x-3 text-sm">
                          <dt className="font-semibold text-slate-500 whitespace-nowrap">{prop.title}:</dt>
                          <dd className="text-slate-700 font-light">{prop.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Footer tag */}
                  <div className="px-6 pb-5">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--light-blue)] bg-blue-50 px-3 py-1 rounded-full">
                      Consultar disponibilidad
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
