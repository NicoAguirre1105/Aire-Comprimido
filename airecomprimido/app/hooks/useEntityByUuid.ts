'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/utils/supabaseClient'
import { getSupabaseErrorMessage } from '@/app/utils/supabaseErrors'
import type { Empresa, Area, Equipo } from '@/app/types/database'

export type EntityType = 'empresa' | 'area' | 'equipo'

export type EntityResult =
  | { entity: Empresa; entityType: 'empresa' }
  | { entity: Area; entityType: 'area' }
  | { entity: Equipo; entityType: 'equipo' }

type UseEntityByUuidResult = {
  entityResult: EntityResult | null
  loading: boolean
  error: string | null
}

export function useEntityByUuid(uuid: string | null): UseEntityByUuidResult {
  const [entityResult, setEntityResult] = useState<EntityResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!uuid) {
      setLoading(false)
      return
    }

    const fetchEntity = async () => {
      try {
        setLoading(true)
        setError(null)

        const [empresaRes, areaRes, equipoRes] = await Promise.all([
          supabase.from('empresas').select('*').eq('public_uuid', uuid).maybeSingle(),
          supabase.from('areas').select('*').eq('public_uuid', uuid).maybeSingle(),
          supabase.from('equipos').select('*').eq('public_uuid', uuid).maybeSingle(),
        ])

        if (empresaRes.error) throw empresaRes.error
        if (areaRes.error) throw areaRes.error
        if (equipoRes.error) throw equipoRes.error

        if (empresaRes.data) {
          setEntityResult({ entity: empresaRes.data as Empresa, entityType: 'empresa' })
        } else if (areaRes.data) {
          setEntityResult({ entity: areaRes.data as Area, entityType: 'area' })
        } else if (equipoRes.data) {
          setEntityResult({ entity: equipoRes.data as Equipo, entityType: 'equipo' })
        } else {
          setEntityResult(null)
        }
      } catch (err: unknown) {
        setError(getSupabaseErrorMessage(err, 'No se pudo cargar la entidad.'))
      } finally {
        setLoading(false)
      }
    }

    fetchEntity()
  }, [uuid])

  return { entityResult, loading, error }
}
