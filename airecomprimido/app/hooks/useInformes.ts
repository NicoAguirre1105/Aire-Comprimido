'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import type { Informe } from '@/app/types/database'

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Error desconocido'
}

export function useInformes() {
  const [data, setData] = useState<Informe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: rows, error: supabaseError } = await supabase
        .from('informes')
        .select('*')
        .order('fecha', { ascending: false })

      if (supabaseError) throw supabaseError

      setData((rows as Informe[]) ?? [])
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
