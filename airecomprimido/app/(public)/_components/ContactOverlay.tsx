"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useContactVisibility } from "../../_context/ContactVisibilityContext"
import { ContactForm } from "./ContactForm"

const WAUrl = "https://api.whatsapp.com/send?phone=593991848293"
const mapsUrl = "https://www.google.com/maps/place/0%C2%B007'15.7%22S+78%C2%B026'10.7%22W/@-0.121031,-78.4371497,18z"

export function ContactOverlay() {
  const { isVisible, toggleContact } = useContactVisibility()

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="contact-overlay"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-0 z-[90] bg-[var(--dark-blue)] flex flex-col overflow-y-auto"
        >
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-slate-700 bg-[var(--dark-blue)]">
            <button
              onClick={toggleContact}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Volver"
            >
              <Image src="/icons/left_arrow_white.svg" alt="Volver" width={24} height={24} className="h-5 w-auto" />
              <span className="text-sm font-medium">Volver</span>
            </button>
            <Image
              src="/logos/company_white.png"
              alt="AireComprimido EC"
              width={600}
              height={200}
              className="h-7 w-auto"
            />
            <div className="w-16" />
          </div>

          {/* Content */}
          <div className="flex-1 px-6 sm:px-10 py-12 max-w-5xl mx-auto w-full">

            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--light-blue)] mb-3">
                Contáctenos
              </p>
              <h2 className="text-4xl font-bold text-white mb-3">
                Estamos para ayudarle
              </h2>
              <p className="text-slate-400 font-light text-lg">
                Escríbanos o visítenos. Respondemos a la brevedad.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

              {/* Contact info */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <Link
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-slate-800 hover:bg-slate-700 rounded-2xl p-5 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--dark-blue)] border border-slate-600 flex items-center justify-center shrink-0 group-hover:border-[var(--light-blue)] transition-colors">
                    <Image src="/icons/location.svg" alt="Ubicación" width={24} height={24} className="h-5 w-auto brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Dirección</p>
                    <p className="text-white font-medium text-sm leading-snug">José Mogro Oe10D s/n y Matilde Hidalgo, Quito</p>
                    <p className="text-[var(--light-blue)] text-xs mt-1">Abrir en el mapa →</p>
                  </div>
                </Link>

                <Link
                  href={WAUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-slate-800 hover:bg-slate-700 rounded-2xl p-5 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--dark-blue)] border border-slate-600 flex items-center justify-center shrink-0 group-hover:border-[var(--light-blue)] transition-colors">
                    <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} className="h-5 w-auto brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">WhatsApp</p>
                    <p className="text-white font-medium text-sm">+593 991 848 293</p>
                    <p className="text-[var(--light-blue)] text-xs mt-1">Escribir por WhatsApp →</p>
                  </div>
                </Link>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-6">Envíenos un mensaje</h3>
                <ContactForm dark />
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
