'use client'

import { useState, useEffect } from 'react';

export default function TestApi() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Usamos la variable de entorno
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/test.php`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setData(data);
      })
      .catch((error) => console.error("Error conectando:", error));
  }, []);

  return (
    <div style={{ padding: '50px' }}>
      <h1>Prueba de Conexión Local</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Cargando datos del backend PHP...</p>
      )}
    </div>
  );
}