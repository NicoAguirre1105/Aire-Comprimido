"use client"

import { useId } from "react"
import Image from "next/image"
import { useForm, ValidationError } from "@formspree/react"
import { Spinner } from "../../_components/Spinner"

const inputStyle =
  "w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-light-blue transition-colors"

const inputStyleDark =
  "w-full bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-light-blue transition-colors"

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [state, handleSubmit, reset] = useForm("xdayjngo")
  const uid = useId()
  const field = dark ? inputStyleDark : inputStyle
  const labelClass = dark ? "text-sm font-medium text-slate-300" : "text-sm font-medium text-slate-700"

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center py-10 gap-4 text-center">
        <Image src="/img/paper-plane.png" alt="Mensaje enviado" width={80} height={80} className="opacity-80" />
        <p className={`text-lg font-light ${dark ? "text-slate-200" : "text-slate-700"}`}>
          ¡Mensaje enviado! Nos pondremos en contacto pronto.
        </p>
        <button
          onClick={() => reset()}
          className="mt-1 px-6 py-2.5 bg-light-blue text-white rounded-full font-medium hover:bg-blue-500 transition-colors cursor-pointer"
        >
          Enviar otro
        </button>
      </div>
    )
  }

  if (state.submitting) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner size="lg" variant="dots" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-subject`} className={labelClass}>Asunto *</label>
          <input required type="text" name="subject" id={`${uid}-subject`} placeholder="Ej. Cotización mantenimiento" className={field} />
          <ValidationError field="subject" prefix="subject" errors={state.errors} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className={labelClass}>Nombre *</label>
          <input required type="text" name="full-name" id={`${uid}-name`} placeholder="Ej. Juan Castillo" className={field} />
          <ValidationError field="full-name" prefix="full-name" errors={state.errors} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-phone`} className={labelClass}>Teléfono *</label>
          <input required type="tel" name="phone" id={`${uid}-phone`} placeholder="0987654321" className={field} />
          <ValidationError field="phone" prefix="phone" errors={state.errors} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-email`} className={labelClass}>Correo electrónico *</label>
          <input required type="email" name="email" id={`${uid}-email`} placeholder="ejemplo@empresa.com" className={field} />
          <ValidationError field="email" prefix="email" errors={state.errors} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-message`} className={labelClass}>Mensaje</label>
        <textarea
          name="message"
          id={`${uid}-message`}
          rows={4}
          placeholder="Cuéntenos sobre su equipo o necesidad..."
          className={`${field} resize-none`}
        />
        <ValidationError field="message" prefix="message" errors={state.errors} />
      </div>
      <button
        type="submit"
        className="self-start px-8 py-3 bg-light-blue text-white font-semibold rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
      >
        Enviar mensaje
      </button>
    </form>
  )
}
