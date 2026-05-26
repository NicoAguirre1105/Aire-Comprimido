/** Tiempo en ms antes de ocultar alertas en pantalla */
export const ALERT_DISMISS_MS = 4000

type SupabaseLikeError = {
  message?: string
  code?: string
  statusCode?: string | number
  error?: string
}

function getErrorPayload(err: unknown): SupabaseLikeError {
  if (typeof err === 'string') return { message: err }
  if (err instanceof Error) return { message: err.message }
  if (typeof err === 'object' && err !== null) return err as SupabaseLikeError
  return {}
}

export function getSupabaseErrorMessage(
  err: unknown,
  fallback = 'Ocurrió un error inesperado. Intente nuevamente.'
): string {
  const { message = '', code = '', statusCode, error: errorField } = getErrorPayload(err)
  const text = `${message} ${errorField ?? ''}`.toLowerCase()
  const status = String(statusCode ?? '')

  // Autenticación
  console.log(getErrorPayload(err))
  if (
    code === 'invalid_credentials' ||
    text.includes('invalid login credentials') ||
    text.includes('invalid email or password')
  ) {
    return 'Usuario o contraseña incorrectos.'
  }
  if (code === 'email_not_confirmed' || text.includes('email not confirmed')) {
    return 'Debe confirmar su correo antes de iniciar sesión.'
  }
  if (code === 'user_not_found') {
    return 'No existe una cuenta con ese usuario.'
  }
  if (text.includes('too many requests') || status === '429') {
    return 'Demasiados intentos. Espere un momento e intente de nuevo.'
  }

  // Red / servidor
  if (text.includes('failed to fetch') || text.includes('network')) {
    return 'No se pudo conectar con el servidor. Verifique su conexión.'
  }
  if (status === '401' || text.includes('jwt') || text.includes('not authorized')) {
    return 'Su sesión expiró. Vuelva a iniciar sesión.'
  }
  if (status === '403' || text.includes('permission denied') || text.includes('row-level security')) {
    return 'No tiene permisos para realizar esta acción.'
  }
  if (status === '404' || text.includes('not found')) {
    return 'No se encontró el recurso solicitado.'
  }

  // Storage
  if (code === 'Bucket not found' || text.includes('bucket not found')) {
    return 'El almacén de archivos no está disponible. Contacte a soporte.'
  }
  if (code === '413' || text.includes('payload too large') || text.includes('file too large') || text.includes('maximum allowed size')) {
    return 'El archivo es demasiado grande.'
  }
  if (text.includes('already exists') || text.includes('duplicate')) {
    return 'Ya existe un registro con esos datos.'
  }
  if (text.includes('invalid mime type') || text.includes('mime type')) {
    return 'El tipo de archivo no está permitido.'
  }

  // Base de datos
  if (code === '23505' || text.includes('unique constraint')) {
    return 'Ya existe un registro con ese nombre.'
  }
  if (code === '23503' || text.includes('foreign key')) {
    return 'No se puede completar la operación porque hay datos relacionados.'
  }
  if (code === 'PGRST103' || text.includes('range not satisfiable')) {
    return 'No hay más páginas para mostrar.'
  }

  if (message.trim()) return message
  return fallback
}
