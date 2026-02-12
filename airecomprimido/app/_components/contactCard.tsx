'use client'

import { useContactVisibility } from "../_context/ContactVisibilityContext"
import ContactInfo from "./contactInfo"
import EmailForm from "./emailForm"
import EmailSentMessage from "./emailSentMessage"
import { useState } from 'react'

import Image from "next/image"

export default function ContactCard()
{
  const [windowState, setWindowState] = useState("contact-info") /* Possible values: contact-info, email-form, message-sent */
  const { isVisible, toggleContact } = useContactVisibility()
  
  const handleWindowState = (newState:string) => {
    setWindowState(newState)
  }

  return (
    <>
    <div className={`${isVisible ? "fixed" : "hidden"} w-full h-full top-0 left-0 z-100 md:bg-black/40 md:backdrop-blur-xs`}>
      <div className="overflow-y-auto flex flex-col w-full h-full bg-(--dark-blue) px-10 py-20 text-sm text-white sm:px-20
      md:absolute md:w-2/3 md:max-w-120 md:max-h-9/10 md:h-fit md:top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bg-white md:rounded-lg md:p-10 md:text-(--dark-blue) md:text-base md:overflow-visible">
        <Image
          src="/icons/close.svg"
          alt="Close Icon"
          width={24}
          height={24} 
          className="h-10 w-auto fixed top-5 right-5 cursor-pointer hover:scale-110 transition-all duration-300
          md:absolute md:top-0 md:right-0 md:translate-x-1/2 md:-translate-y-1/2 md:bg-(--dark-blue) md:w-9 md:h-9 md:rounded-4xl md:p-1"
          onClick={toggleContact}
        />
       
        {windowState == 'contact-info' && 
          <ContactInfo handleWindowState={handleWindowState}/>
        }
        {windowState == 'email-form' &&
          <EmailForm handleWindowState={handleWindowState}/>
        }
        {windowState == 'message-sent' &&
          <EmailSentMessage />
        }
      </div>
    </div>
    </>
  )
}