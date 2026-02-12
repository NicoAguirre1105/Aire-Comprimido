'use client'
import { useState } from 'react'
import type { SubmitEvent } from 'react'
import Image from 'next/image'
import { useViewport } from '../_context/ViewportContext'


export default function EmailForm({
  handleWindowState
}: {
  handleWindowState: (newState:string) => void
}) {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleForm = async (e:SubmitEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`/api/sendEmail.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        handleWindowState('message-sent')
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  const handleReturn = () => {
    handleWindowState('contact-info')
  }

  const subtitleStyle = 'text-xl font-medium'
  const inputStyle = 'bg-(--grey-blue) px-2 py-1 text-(--dark-blue) rounded-sm font-semibold placeholder:text-(--dark-blue) placeholder:italic placeholder:font-normal'

  const { isMobile } = useViewport()

  return (
    <>
      {isMobile ? 
        <Image
        src="/icons/arrow_white.svg"
        alt="Return arrow"
        width={24}
        height={24} 
        className="h-9 w-auto fixed top-5.5 left-8 cursor-pointer
        md:absolute"
        onClick={handleReturn}
        />
      :
        <Image
        src="/icons/arrow_blue.svg"
        alt="Return Arrow"
        width={24}
        height={24} 
        className="h-9 w-auto absolute top-5 left-5 cursor-pointer hover:scale-110 transition-all duration-300"
        onClick={handleReturn}
        />
      }
      
      <h3 className='window-title'>Formulario de envío</h3>
      <form onSubmit={handleForm} className='flex flex-col gap-3'>
        <h4 className={subtitleStyle}>Asunto*</h4>
        <input 
          type="text" placeholder="Ej. Visita técnica" 
          onChange={(e) => setSubject(e.target.value)}
          className={inputStyle}
        />
        <h4 className={subtitleStyle}>Correo electrónico*</h4>
        <input 
          type="email" placeholder="ejemplo@gmail.com" 
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
        />
        <h4 className={subtitleStyle}>Contenido*</h4>
        <textarea 
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Quiero agendar una visita técnica en ..."
        className={`${inputStyle} resize-none h-fit`}
        rows={7}
        ></textarea>
        <p className={`${error ? 'visible': 'invisible'} text-red-500 text-xs italic font-semibold`}>*{error}</p>
        <button type="submit" className='button-style bg-(--light-blue) text-white w-30 self-center'>Enviar</button>
      </form>
    </>
  );
}