'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import type { Equipo } from '@/app/types/database'

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Error desconocido'
}

export function useEquipos() {
  const [data, setData] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: rows, error: supabaseError } = await supabase
        .from('equipos')
        .select('*')
        .order('equipo', { ascending: true })

      if (supabaseError) throw supabaseError

      setData((rows as Equipo[]) ?? [])
    } catch (err: unknown) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
