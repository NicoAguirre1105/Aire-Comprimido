'use client'

import Image from 'next/image'
<<<<<<< HEAD:airecomprimido/app/_components/emailForm.tsx
import { useViewport } from '../_context/ViewportContext'
import { useForm, ValidationError} from "@formspree/react"
import { Spinner } from './Spinner'
=======
import { useViewport } from '../../_context/ViewportContext'
>>>>>>> 95bf102 (Move components according to usage):airecomprimido/app/(public)/_components/emailForm.tsx


export default function EmailForm({
  handleWindowState
}: {
  handleWindowState: (newState:string) => void
}) {
  const [state, handleSubmit, reset] = useForm("xdayjngo")

  if (state.succeeded) {
    setTimeout(() => {
      reset()
      handleReturn()
    }, 5000);
  }

  const handleReturn = () => {
    handleWindowState('contact-info')
  }

  const subtitleStyle = 'text-xl font-medium'
  const inputStyle = 'bg-(--grey-blue) px-2 py-1 text-(--dark-blue) rounded-md font-semibold placeholder:text-(--dark-blue) placeholder:italic placeholder:font-normal focus:outline-(--light-blue)'

  const { isMobile } = useViewport()

  return (
    <>
      {isMobile ? 
        <div className='flex top-5.5 left-8 items-center mb-4 pr-3'>
        <Image
        src="/icons/arrow_white.svg"
        alt="Return arrow"
        width={24}
        height={24} 
        className="h-8 w-auto cursor-pointer"
        onClick={handleReturn}
        />
        <h3 className='text-3xl font-semibold'>Formulario de envío</h3>
        </div>
      :
        <div className='flex items-center mb-4'>
        <Image
        src="/icons/arrow_blue.svg"
        alt="Return Arrow"
        width={24}
        height={24} 
        className="h-9 w-auto cursor-pointer hover:scale-110 transition-all duration-300"
        onClick={handleReturn}
        />
        <h3 className='text-3xl font-semibold'>Formulario de envío</h3>
        </div>
      }

      {!state.submitting && !state.succeeded &&
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label htmlFor="subject" className={subtitleStyle}>Asunto*</label>
        <input required type="text" placeholder='Ej. Visita técnica' name='subject' id='subject' 
        className={inputStyle}/>
        <ValidationError field="subject" prefix="subject" errors={state.errors}></ValidationError>
        <label htmlFor="full-name" className={subtitleStyle}>Nombre*</label>
        <input required type="text" placeholder='Ej. Juan Castillo' name='full-name' id='full-name' 
        className={inputStyle}/>
        <ValidationError field="full-name" prefix="full-name" errors={state.errors}></ValidationError>
        <label htmlFor="phone" className={subtitleStyle}>Número de contacto*</label>
        <input required type="tel" name="phone" id="phone" placeholder="Ej. 0987654321" className={inputStyle}/>
        <ValidationError field="phone" prefix="phone" errors={state.errors}></ValidationError>
        <label htmlFor="email" className={subtitleStyle}>Correo electrónico*</label>
        <input required type="email" name="email" id="email" placeholder='ejemplo@gmail.com' 
        className={inputStyle}/>
        <ValidationError field="email" prefix="email" errors={state.errors}></ValidationError>
        <label htmlFor="message" className={subtitleStyle}>Mensaje</label>
        <textarea name="message" id="message" rows={5} placeholder='Quiero agendar una visita técnica en...'
        className={`${inputStyle} resize-none h-fit`}></textarea>
        <ValidationError field="message" prefix="message" errors={state.errors}></ValidationError>
        <button type="submit" className='button-style bg-(--light-blue) text-white w-30 self-center'>Enviar</button>
      </form>
      }

      {state.submitting && 
      <div className="flex justify-center items-center h-100">
        <Spinner size='lg' variant='dots'/>
      </div>
      }

      {state.succeeded &&
      <>
        <Image
          src="/img/paper-plane.png"
          alt="Close Icon"
          width={24}
          height={24} 
          className="h-3/5 w-fit mx-auto"
        />
        <p className="text-center py-5 px-5 text-xl font-light">El correo ha sido enviado exitosamente!</p>
        <button onClick={handleReturn} className="button-style bg-(--light-blue) text-white w-30 self-center">Hecho</button>
      </>
      }
    </>
  );
}