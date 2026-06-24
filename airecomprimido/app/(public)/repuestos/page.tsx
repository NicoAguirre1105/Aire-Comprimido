import Image from "next/image"
import { FadeIn } from "../_components/FadeIn"

const categories = [
  {
    title: "Repuestos de compresor",
    items: [
      "Filtros de Aceite",
      "Filtros de Aire",
      "Separadores de Aceite",
      "Kits de bandas",
      "Kits de buje y retenedor",
      "Kits de rodamientos (elementos compresores)",
      "Kits de rodamientos (motores eléctricos)",
      "Poleas",
      "Post Enfriadores de aire y/o aceite",
    ],
  },
  {
    title: "Válvulas y controles",
    items: [
      "Kits de válvulas Check",
      "Kits de válvulas de admisión",
      "Kits de válvulas de cierre de aceite",
      "Kits de válvulas de drenaje",
      "Kits de válvulas de presión continua",
      "Kits de válvulas de regulación",
      "Kits de válvulas solenoides",
      "Kits de válvulas termostáticas",
      "Presóstatos",
    ],
  },
  {
    title: "Instrumentación y electrónica",
    items: [
      "Horómetros",
      "Manómetros",
      "Módulos electrónicos",
      "Sensores de presión",
      "Sensores de temperaturas",
      "Switch de temperaturas",
    ],
  },
  {
    title: "Líneas de aire y accesorios",
    items: [
      "Filtros de alta eficacia para líneas de aire",
      "Reguladores de presión",
      "Válvulas de drenaje condensado",
      "Conjuntos de mantenimiento",
      "Pistolas de soplado",
    ],
  },
]

const brands = [
  { src: '/logos/atlas_copco.svg', alt: 'Atlas Copco' },
  { src: '/logos/kaeser.svg', alt: 'Kaeser' },
  { src: '/logos/IR_logo.svg', alt: 'Ingersoll Rand' },
  { src: '/logos/quincy.svg', alt: 'Quincy' },
  { src: '/logos/airhorse.svg', alt: 'Airhorse' },
  { src: '/logos/hertz.svg', alt: 'Hertz' },
]

const galleryImages = [
  "/img/repuestos1.jpg", "/img/repuestos2.jpg", "/img/repuestos3.jpg",
  "/img/repuestos4.jpg", "/img/repuestos8.jpg", "/img/repuestos9.jpg",
]

export default function Repuestos() {
  return (
    <main className="overflow-x-hidden">

      {/* Hero */}
      <section className="bg-[var(--dark-blue)] py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--light-blue) 1px, transparent 1px), linear-gradient(90deg, var(--light-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
            Catálogo
          </p>
          <h1 className="text-5xl font-bold text-white mb-4 max-sm:text-4xl">
            Repuestos Originales
          </h1>
          <p className="text-slate-300 text-lg font-light max-w-xl mx-auto mb-10">
            Stock permanente de repuestos originales multimarca. Importamos cualquier pieza directamente de fábrica.
          </p>
          {/* Brand logos */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brands.map((b) => (
              <Image
                key={b.alt}
                src={b.src}
                alt={b.alt}
                width={100}
                height={36}
                className="h-7 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-slate-900 py-6 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-3">
          {galleryImages.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={src}
                alt={`Repuesto ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[var(--dark-blue)]/30" />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
              Disponibilidad en stock
            </p>
            <h2 className="text-4xl font-bold text-[var(--dark-blue)] mb-4">
              Repuestos que tenemos para usted
            </h2>
            <p className="text-slate-500 font-light text-lg max-w-xl mx-auto">
              Disponemos de los siguientes repuestos originales en marcas como Atlas Copco, Kaeser, Ingersoll Rand, Quincy, Airhorse y más.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <FadeIn key={cat.title} delay={i * 0.08}>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-8 rounded-full bg-[var(--light-blue)]" />
                    <h3 className="text-xl font-semibold text-[var(--dark-blue)]">{cat.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-600 font-light text-sm">
                        <svg className="w-4 h-4 text-[var(--light-blue)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 bg-[var(--dark-blue)] rounded-2xl p-8 text-center">
            <p className="text-white text-lg font-light mb-2">
              ¿No encuentra el repuesto que necesita?
            </p>
            <p className="text-slate-300 font-light mb-6">
              Podemos importar cualquier repuesto original directamente de fábrica. Consúltenos.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=593991848293"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--light-blue)] text-white font-semibold rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
