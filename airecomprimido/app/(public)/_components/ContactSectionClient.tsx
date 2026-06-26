"use client"

import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "./FadeIn"
import { ContactForm } from "./ContactForm"

const contactItems = [
  {
    label: "Dirección",
    value: "José Mogro Oe10D s/n y Matilde Hidalgo, Quito",
    href: "https://www.google.com/maps/place/0%C2%B007'15.7%22S+78%C2%B026'10.7%22W/@-0.121031,-78.4371497,18z",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+593 991 848 293",
    href: "https://api.whatsapp.com/send?phone=593991848293",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export function ContactSectionClient() {
  return (
    <section id="contacto" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-light-blue mb-3">
            Contáctenos
          </p>
          <h2 className="text-4xl font-bold text-dark-blue mb-4">
            Solicite su cotización hoy
          </h2>
          <p className="text-slate-600 text-lg font-light max-w-xl mx-auto">
            Nuestro equipo técnico está listo para asesorarle. Escríbanos o llámenos y le respondemos a la brevedad.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info + map */}
          <FadeIn direction="left" className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              {contactItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-dark-blue text-light-blue flex items-center justify-center shrink-0 group-hover:bg-light-blue group-hover:text-white transition-colors duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-slate-700 font-medium group-hover:text-light-blue transition-colors duration-200">{item.value}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-52 relative">
              <iframe
                title="Ubicación AIRECOMPRIMIDO EC"
                src="https://maps.google.com/maps?q=-0.1210307,-78.4363065&z=16&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h3 className="text-xl font-semibold text-dark-blue mb-6">Envíenos un mensaje</h3>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
