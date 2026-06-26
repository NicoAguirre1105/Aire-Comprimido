'use client'
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import DataList from "./dataList"
import { useEquipos } from "@/app/hooks/useEquipos"
import { useEmpresas } from "@/app/hooks/useEmpresas"
import { useAreas } from "@/app/hooks/useAreas"
import Alert from "@/app/_components/Alert"
import { supabase } from "@/app/utils/supabaseClient"
import { getSupabaseErrorMessage } from "@/app/utils/supabaseErrors"
import { useAlert } from "@/app/hooks/useAlert"
import { Spinner } from "@/app/_components/Spinner"
import type { Informe } from "@/app/types/database"

type itemsCreation = {
  company: boolean
  area: boolean
  device: boolean
}

type FormType = {
  created_at: Date
  titulo: string
  fecha: string
  descripcion: string
  empresa: string
  area: string
  equipo: string
  modelo: string
  conteo_horas: string
}

export default function EditReportForm({
  informe,
  onClose,
  onReportUpdated,
}: {
  informe: Informe
  onClose: () => void
  onReportUpdated?: () => void
}) {
  const today = new Date().toISOString().split("T")[0]
  const fiveYearsAgo = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 5)
    return d.toISOString().split("T")[0]
  })()

  const { alert, showAlert } = useAlert()
  const [warning, setWarning] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const [uploadMessage, setUploadMessage] = useState("")
  const resolveWarningRef = useRef<((accepted: boolean) => void) | null>(null)

  const [title, setTitle] = useState(informe.titulo)
  const [reportDate, setReportDate] = useState(informe.fecha)
  const [description, setDescription] = useState(informe.descripcion ?? "")
  const [hoursCount, setHoursCount] = useState(
    informe.conteo_horas === 0 ? "" : String(informe.conteo_horas)
  )
  const [company, setCompany] = useState(informe.empresa)
  const [area, setArea] = useState(informe.area)
  const [device, setDevice] = useState(informe.equipo)
  const [modelOverride, setModelOverride] = useState<string | null>(null)

  const { data: empresas, error: empresasError } = useEmpresas()
  const { data: equipos, refetch: equiposRefetch, error: equiposError } = useEquipos()
  const { data: areas, refetch: areasRefetch, error: areaError } = useAreas()

  const autoModel = useMemo(
    () => equipos.find((e) => e.name === device)?.modelo ?? "",
    [equipos, device]
  )
  const model = modelOverride ?? autoModel
  const setModel = (v: string) => setModelOverride(v)

  useEffect(() => {
    const loadError = empresasError ?? equiposError ?? areaError
    if (loadError) showAlert('error', loadError)
  }, [empresasError, equiposError, areaError, showAlert])

  const handleWarningDecline = useCallback(() => {
    setShowWarning(false)
    setWarning([])
    const resolve = resolveWarningRef.current
    resolveWarningRef.current = null
    resolve?.(false)
  }, [])

  function validateForm(form: FormType): string | null {
    if (!form.titulo.trim()) return 'Complete el título del reporte.'
    if (!form.fecha) return 'Ingrese la fecha del reporte.'
    if (!form.empresa.trim()) return 'Ingrese la empresa.'
    if (!form.area.trim()) return 'Ingrese el área respectiva.'
    if (!form.equipo.trim()) return 'Ingrese el equipo asociado al reporte.'
    if (!form.modelo.trim()) return 'Ingrese el modelo del equipo asociado al reporte.'

    if (form.descripcion.length > 180) {
      return 'La descripción debe tener menos de 180 caracteres.'
    }

    const date = new Date(form.fecha)
    const today = new Date(form.created_at)
    const limit = new Date(fiveYearsAgo)

    if (date > today) return 'La fecha no puede ser mayor a la actual.'
    if (date < limit) return 'La fecha no puede ser anterior a 5 años.'

    const hours = Number(form.conteo_horas)
    if (Number.isNaN(hours) || hours < 0) {
      return 'El número de horas debe ser mayor o igual a 0.'
    }

    const equipo_check = equipos.find((e) => e.name === form.equipo)
    if (equipo_check && equipo_check.modelo !== form.modelo) {
      return 'El modelo no coincide con el equipo seleccionado. Vuelva a elegir el equipo o contacte a soporte.'
    }

    return null
  }

  function checkFormWarnings(form: FormType): { insertItems: itemsCreation; warnings: string[] } {
    const new_warning: string[] = []

    const insertItems: itemsCreation = {
      company: false,
      area: false,
      device: false,
    }

    const area_check = areas.find((a) => a.name === form.area)
    const equipo_check = equipos.find((e) => e.name === form.equipo)
    const empresa_check = empresas.find((e) => e.name === form.empresa)

    if (!form.descripcion) new_warning.push('El reporte no tiene descripción.')

    if (empresa_check && !area_check && form.area === "") {
      areasRefetch({ empresa: empresa_check.name || "" })
      if (areas.length > 0)
        new_warning.push("La empresa asignada tiene áreas disponibles, pero ninguna ha sido seleccionada para este reporte.")
    }

    if (!empresa_check) {
      const parts: string[] = []
      if (form.empresa !== informe.empresa)
        parts.push(`Empresa: ${informe.empresa} → ${form.empresa}`)
      else
        parts.push(`Empresa: ${form.empresa}`)
      if (form.area !== informe.area)
        parts.push(`Área: ${informe.area} → ${form.area}`)
      else
        parts.push(`Área: ${form.area}`)
      if (form.equipo !== informe.equipo)
        parts.push(`Equipo: ${informe.equipo} → ${form.equipo}`)
      else
        parts.push(`Equipo: ${form.equipo}`)
      new_warning.push(`Se crearán nuevos elementos: ${parts.join(', ')}.`)
      insertItems.company = true
      insertItems.area = true
      insertItems.device = true
    } else if (!area_check && form.area) {
      const parts: string[] = []
      if (form.area !== informe.area)
        parts.push(`Área: ${informe.area} → ${form.area}`)
      else
        parts.push(`Área: ${form.area}`)
      if (form.equipo !== informe.equipo)
        parts.push(`Equipo: ${informe.equipo} → ${form.equipo}`)
      else
        parts.push(`Equipo: ${form.equipo}`)
      new_warning.push(`Se crearán nuevos elementos: ${parts.join(', ')}.`)
      insertItems.area = true
      insertItems.device = true
    } else if (!equipo_check) {
      const label = form.equipo !== informe.equipo
        ? `${informe.equipo} → ${form.equipo}`
        : form.equipo
      new_warning.push(`Se creará un nuevo elemento: Equipo: ${label}.`)
      insertItems.device = true
    }

    if (new_warning.length > 0) {
      setWarning(new_warning)
      setShowWarning(true)
    } else {
      setWarning([])
      setShowWarning(false)
    }

    return { insertItems, warnings: new_warning }
  }

  function waitForWarningApproval(): Promise<boolean> {
    return new Promise((resolve) => {
      resolveWarningRef.current = resolve
    })
  }

  const handleWarningAccept = () => {
    setShowWarning(false)
    setWarning([])
    const resolve = resolveWarningRef.current
    resolveWarningRef.current = null
    resolve?.(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form: FormType = {
      created_at: new Date(today),
      titulo: title,
      fecha: reportDate,
      descripcion: description,
      empresa: company,
      area: area,
      equipo: device,
      modelo: model,
      conteo_horas: hoursCount === '' ? '0' : hoursCount,
    }

    const validationError = validateForm(form)
    if (validationError) {
      showAlert('error', validationError)
      return
    }

    const { insertItems: itemsToCreate, warnings } = checkFormWarnings(form)

    if (warnings.length > 0) {
      const accepted = await waitForWarningApproval()
      if (!accepted) return
    }

    const failSubmit = (err: unknown, fallback: string) => {
      setUploadMessage('')
      showAlert('error', getSupabaseErrorMessage(err, fallback))
    }

    try {
      setUploadMessage('Actualizando informe')

      if (itemsToCreate.company) {
        setUploadMessage('Creando empresa')
        const { error: empresaError } = await supabase
          .from('empresas')
          .insert({ name: form.empresa })
        if (empresaError) { failSubmit(empresaError, 'No se pudo crear la empresa.'); return }
        setUploadMessage('Empresa creada')
      }

      if (itemsToCreate.area) {
        setUploadMessage('Creando área')
        const { error: areaError } = await supabase
          .from('areas')
          .insert({ name: form.area, empresa: form.empresa })
        if (areaError) { failSubmit(areaError, 'No se pudo crear el área.'); return }
        setUploadMessage('Área creada')
      }

      if (itemsToCreate.device) {
        setUploadMessage('Creando equipo')
        const { error: equipoError } = await supabase
          .from('equipos')
          .insert({
            name: form.equipo,
            modelo: form.modelo,
            empresa: form.empresa,
            area: form.area,
          })
        if (equipoError) { failSubmit(equipoError, 'No se pudo crear el equipo.'); return }
        setUploadMessage('Equipo creado')
      }

      setUploadMessage('Guardando cambios')
      const { error: informeError } = await supabase
        .from('informes')
        .update({
          titulo: form.titulo,
          fecha: form.fecha,
          descripcion: form.descripcion,
          empresa: form.empresa,
          area: form.area,
          equipo: form.equipo,
          conteo_horas: Number(form.conteo_horas),
        })
        .eq('id', informe.id)

      if (informeError) {
        failSubmit(informeError, 'No se pudo actualizar el informe.')
        return
      }

      setUploadMessage('')
      onReportUpdated?.()
    } catch (err) {
      failSubmit(err, 'No se pudo actualizar el reporte.')
    }
  }

  const handleCompanySelection = (new_empresa: string) => {
    setCompany(new_empresa)
    areasRefetch({ empresa: new_empresa })
    equiposRefetch({ empresa: new_empresa })
  }

  const handleAreaSelection = (new_area: string) => {
    setArea(new_area)
    const found = areas.find((a) => a.name === new_area)
    if (found) setCompany(found.empresa || "")
    equiposRefetch({ area: new_area })
  }

  const handleDeviceSelection = (new_equipo: string) => {
    setDevice(new_equipo)
    const equipo = equipos.find((e) => e.name === new_equipo)
    if (equipo) {
      setCompany(equipo.empresa || "")
      setArea(equipo.area || "")
      setModelOverride(null)
    }
  }

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-dark-blue placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-150"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors duration-150"
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-semibold text-dark-blue">Editar reporte</h2>
          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[18rem]">{informe.titulo}</p>
        </div>
      </div>

      {uploadMessage ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 flex flex-col items-center gap-4">
          <Spinner size="lg" variant="ring" />
          <p className="text-sm font-medium text-slate-600">{uploadMessage}</p>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Información básica */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Información básica</h3>

            <div>
              <label htmlFor="title" className={labelClass}>
                Título <span className="text-light-blue">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Mantenimiento mensual"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="report-date" className={labelClass}>
                  Fecha del reporte <span className="text-light-blue">*</span>
                </label>
                <input
                  type="date"
                  name="report-date"
                  id="report-date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value.trim())}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="hours-count" className={labelClass}>Conteo de horas</label>
                <div className="relative">
                  <input
                    type="number"
                    name="hours-count"
                    id="hours-count"
                    min={0}
                    value={hoursCount}
                    onChange={(e) => setHoursCount(e.target.value.trim())}
                    placeholder="0"
                    className={`${inputClass} pr-10 no-spinner`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">hrs</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>Descripción</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={180}
                rows={3}
                placeholder="Escribe aquí..."
                className={`${inputClass} resize-none`}
              />
              <p className="text-right text-xs text-slate-400 mt-1">{description.length}/180</p>
            </div>
          </div>

          {/* Ubicación y equipo */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Ubicación y equipo</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="report-company" className={labelClass}>
                  Empresa <span className="text-light-blue">*</span>
                </label>
                <DataList
                  options={empresas}
                  placeholder="Ingrese empresa"
                  state={company}
                  handleChange={handleCompanySelection}
                  id="report-company"
                  key="empresa"
                  required
                  inputClass={inputClass}
                />
              </div>
              <div>
                <label htmlFor="report-area" className={labelClass}>
                  Área <span className="text-light-blue">*</span>
                </label>
                <DataList
                  options={areas}
                  placeholder="Ingrese área"
                  state={area}
                  handleChange={handleAreaSelection}
                  id="report-area"
                  key="area"
                  required
                  inputClass={inputClass}
                />
              </div>
              <div>
                <label htmlFor="report-device" className={labelClass}>
                  Serie <span className="text-light-blue">*</span>
                </label>
                <DataList
                  options={equipos}
                  placeholder="Número de serie"
                  state={device}
                  handleChange={handleDeviceSelection}
                  id="report-device"
                  key="equipo"
                  required
                  inputClass={inputClass}
                />
              </div>
              <div>
                <label htmlFor="report-model" className={labelClass}>
                  Modelo <span className="text-light-blue">*</span>
                </label>
                <input
                  type="text"
                  name="report-model"
                  id="report-model"
                  placeholder="Modelo"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={inputClass}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pb-4">
            <button
              type="submit"
              className="bg-light-blue hover:bg-dark-blue text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-colors duration-200"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      )}

      {alert && <Alert type={alert.type} message={alert.message} />}

      {showWarning && (
        <Alert type="warning" message="Tenga en cuenta la siguiente información.">
          <ul className="text-sm list-disc pl-1 space-y-0.5">
            {warning.map((m) => <li key={m}>{m}</li>)}
          </ul>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={handleWarningAccept}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-600 cursor-pointer transition-colors duration-150"
            >
              Continuar
            </button>
            <button
              type="button"
              onClick={handleWarningDecline}
              className="border border-yellow-600 text-yellow-700 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-50 cursor-pointer transition-colors duration-150"
            >
              Cancelar
            </button>
          </div>
        </Alert>
      )}
    </div>
  )
}
