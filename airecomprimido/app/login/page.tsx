'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient'
import { getSupabaseErrorMessage } from '../utils/supabaseErrors'
import { useAlert } from '../hooks/useAlert'
import Alert from '../_components/Alert'
import BgLogo from '../_components/bgLogo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { alert, showAlert } = useAlert()
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password) {
      showAlert('error', 'Ingrese usuario y contraseña.')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      showAlert('error', getSupabaseErrorMessage(error, 'No se pudo iniciar sesión.'))
      return
    }
    router.push('/reportes')
  }

  const inputStyle = 'mb-4 placeholder-black/50 border-b-2 border-dark-blue py-1 px-2 focus:outline-none focus:border-b-[3px] placeholder:italic placeholder:font-normal font-medium'

  return (
    <>
    <BgLogo />
    {alert && <Alert type={alert.type} message={alert.message} />}
    <div className="flex min-h-full flex-1">
      <div className="m-auto h-full w-full flex flex-col items-center gap-5 text-dark-blue">
        <h2 className='text-3xl font-bold text-center'>Inicio de sesión</h2>
        <form onSubmit={handleLogin} className='mt-5 flex flex-col'>
          <input 
            type="text" placeholder="Usuario*" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputStyle} outline-`}
          />
          <input 
            type="password" placeholder="Contraseña*" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputStyle}`}
          />
          <button type="submit" className='my-5 bg-light-blue text-white py-2 rounded-md cursor-pointer hover:bg-dark-blue transition-all duration-200 ease-in-out text-base font-medium'>Entrar</button>
        </form>
      </div>
    </div>
    </>
  );
}
