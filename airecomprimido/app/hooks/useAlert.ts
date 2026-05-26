'use client'

import { useState, useEffect, useCallback } from 'react'
import { ALERT_DISMISS_MS } from '@/app/utils/supabaseErrors'

export type AlertType = 'error' | 'warning' | 'info' | 'success'

export type AlertState = {
  type: AlertType
  message: string
} | null

export function useAlert(dismissMs = ALERT_DISMISS_MS) {
  const [alert, setAlert] = useState<AlertState>(null)

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message })
  }, [])

  const clearAlert = useCallback(() => setAlert(null), [])

  useEffect(() => {
    if (!alert) return
    const timer = setTimeout(clearAlert, dismissMs)
    return () => clearTimeout(timer)
  }, [alert, dismissMs, clearAlert])

  return { alert, showAlert, clearAlert }
}
