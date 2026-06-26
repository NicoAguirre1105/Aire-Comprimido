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
  const [loading, setLoading] = useState(false);
  const { alert, showAlert } = useAlert()
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password) {
      showAlert('error', 'Ingrese usuario y contraseña.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      showAlert('error', getSupabaseErrorMessage(error, 'No se pudo iniciar sesión.'))
      return
    }
    router.push('/reportes')
  }

  return (
    <>
      <BgLogo />
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-dark-blue mb-4">
              <svg className="w-6 h-6 text-light-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-dark-blue">Panel administrativo</h1>
            <p className="text-slate-500 text-sm mt-1 font-light">Ingrese sus credenciales para continuar</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Usuario</label>
                <input
                  type="text"
                  placeholder="correo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-dark-blue placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-light-blue/30 focus:border-light-blue transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-dark-blue placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-light-blue/30 focus:border-light-blue transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full py-2.5 bg-dark-blue text-white font-semibold text-sm rounded-lg hover:bg-light-blue transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Ingresando...
                  </span>
                ) : 'Ingresar'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}
