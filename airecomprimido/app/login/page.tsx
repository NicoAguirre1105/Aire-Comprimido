'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  // This uses already Mobile first style
  const inputStyle = 'mb-4 placeholder-black/50 border-b-2 border-(--dark-blue) py-1 px-2 focus:outline-none focus:border-b-3 placeholder:italic placeholder:font-normal font-medium'

  return (
    <div className="flex min-h-full flex-1 pt-16">
      <div className="m-auto h-full w-full flex flex-col items-center gap-5 text-(--dark-blue)">
        <h2 className='text-3xl font-bold text-center'>Inicio de sesión</h2>
        <form onSubmit={handleLogin} className='mt-5 flex flex-col'>
          <input 
            type="text" placeholder="Usuario*" 
            onChange={(e) => setUser(e.target.value)}
            className={`${inputStyle} outline-`}
          />
          <input 
            type="password" placeholder="Contraseña*" 
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputStyle}`}
          />
          <p key={error} className={`${error ? 'block' : 'invisible'} text-red-500 font-medium text-xs italic min-h-4`}>! {error}</p>
          <button type="submit" className='my-5 bg-(--light-blue) text-white py-2 rounded-md cursor-pointer hover:bg-(--dark-blue) transition-all duration-200 ease-in-out text-base font-medium'>Entrar</button>
        </form>
      </div>
    </div>
  );
}