'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import type { Equipo } from '@/app/types/database'

type RefetchOptions = {
  empresa?: string
  area?: string
  equipo?: string
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Error desconocido'
}
export function useEquipos() {
  const [data, setData] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async (options?:RefetchOptions) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
      .from('equipos')
      .select('*')
      .order('name', { ascending: true })
  
      if (options?.empresa) {
        query = query.eq('empresa', options.empresa)
      }

      if (options?.area) {
        query = query.eq('area', options.area)
      }

      if (options?.equipo) {
        query = query.eq('name', options.equipo)
      }

      const { data: rows, error: supabaseError } = await query

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
