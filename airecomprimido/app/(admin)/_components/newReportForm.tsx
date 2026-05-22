'use client'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import styles from "../_styles/newReport.module.css"
import DataList from "./dataList"
import { useEquipos } from "@/app/hooks/useEquipos"
import { useEmpresas } from "@/app/hooks/useEmpresas"
import { useAreas } from "@/app/hooks/useAreas"
import Alert from "@/app/_components/Alert"
import { supabase} from "@/app/utils/supabaseClient"
import { Spinner } from "@/app/_components/Spinner"

const TODAY = new Date().toISOString().split("T")[0]
const FIVE_YEARS_AGO = (() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 5)
  return d.toISOString().split("T")[0]
})()

type itemsCreation = {
  company: boolean,
  area: boolean,
  device: boolean
}

type FormType = {
  created_at: Date;
  titulo: string;
  fecha: string;
  descripcion: string;
  empresa: string;
  area: string;
  equipo: string;
  modelo: string;
  conteo_horas: string;
  file: File | null;
  fileName: string;
}

export default function NewReportForm({
  handleNewReport,
  onReportCreated,
}:{
  handleNewReport: () => void
  onReportCreated?: () => void
}) {
  const [error, setError] = useState("")
  const [warning, setWarning] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const [uploadMessage, setUploadMessage] = useState("")
  const [newReportCreated,setNewReportCreated] = useState(false)
  const resolveWarningRef = useRef<((accepted: boolean) => void) | null>(null)
  const pendingRefetchRef = useRef(false)

  // Estados para envío a API
  const [title, setTitle] = useState("")
  const [reportDate, setReportDate] = useState(TODAY)
  const [description, setDescription] = useState("")
  const [hoursCount, setHoursCount] = useState("0")
  const [company, setCompany] = useState("")
  const [area, setArea] = useState("")
  const [device, setDevice] = useState("")
  const [model, setModel] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("No se ha seleccionado un archivo")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: empresas, loading: empresasLoading, error: empresasError } = useEmpresas()
  const { data: equipos, refetch: equiposRefetch, loading: equiposLoading, error: equiposError } = useEquipos()
  const { data: areas, refetch: areasRefetch, loading: areasLoading, error: areaError } = useAreas()

  // Cierre automático de la ventana de error a los 4 s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    if(newReportCreated) {
      const timer = setTimeout(() => setNewReportCreated(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [newReportCreated])

  const handleClose = () => {
    if (pendingRefetchRef.current) {
      onReportCreated?.()
      pendingRefetchRef.current = false
      setNewReportCreated(false)
    }
    handleNewReport()
  }

  function validateForm(form:FormType): boolean {
    setError("")

    if(!form.titulo) {setError("Complete el título del reporte."); return false}
    if(!form.fecha) {setError("Ingrese la fecha del reporte."); return false}
    if(!form.empresa) {setError("Ingrese la empresa."); return false}
    if(!form.equipo) {setError("Ingrese el equipo asociado al reporte."); return false}
    if(!form.modelo) {setError("Ingrese el modelo del equipo asociado al reporte."); return false}
    if(!form.file) {setError("Adjunte el reporte en formato PDF."); return false}

    if(form.descripcion.length > 100) {setError("La descripción debe tener menos de 100 caractéres."); return false}
    
    const date = new Date(form.fecha)
    const today = new Date(form.created_at)
    const limit = new Date(FIVE_YEARS_AGO)

    if(date > today) {setError("La fecha no puede ser mayor a la actual."); return false}
    if(date < limit) {setError("La fecha no puede ser anterior a 5 años."); return false}
    
    const hours = Number(form.conteo_horas)
    if(Number.isNaN(Number(form.conteo_horas)) || hours < 0) {setError('Número de horas debe ser mayor o igual a 0.'); return false}

    const equipo_check = equipos.find(e => e.name === form.equipo)
    if(equipo_check && equipo_check.modelo !== form.modelo) {setError("El modelo no coincide con los datos ingresados previamente del equipo. Quite la selección del equipo y vuelva a seleccionarlo o comuníquese con soporte."); return false}
    
    if(form.file.type !== 'application/pdf') {setError("Solo se aceptan archivos con formato PDF."); return false}

    return true
  }

  function checkFormWarnings(form: FormType): { insertItems: itemsCreation; warnings: string[] } {
    const new_warning: string[] = []
  
    const insertItems:itemsCreation = {
      company: false,
      area: false,
      device: false
    }

    const area_check = areas.find(a => a.name === form.area)
    const equipo_check = equipos.find(e => e.name === form.equipo)
    const empresa_check = empresas.find(e => e.name === form.empresa)
  
    if(!form.descripcion) new_warning.push('El reporte no tiene descripción.')

    if (empresa_check && !area_check && form.area !== "") {
      areasRefetch({ empresa: empresa_check.name || "" })
      if (areas.length > 0) new_warning.push("La empresa asignada tiene áreas disponibles, pero ninguna ha sido seleccionada para este reporte.")
    }
  
    if (!empresa_check && form.area) {
      new_warning.push(`Se crearán nuevos elementos: ${form.empresa} , ${form.area}, ${form.equipo}.`)
      insertItems.company = true
      insertItems.area = true
      insertItems.device = true
      
    } else if (!empresa_check && !form.area) {
      new_warning.push(`Se crearán nuevos elementos: ${form.empresa}, ${form.equipo}.`)
      insertItems.company = true
      insertItems.device = true
    } else if (!area_check && form.area) {
      new_warning.push(`Se crearán nuevos elementos: ${form.area}, ${form.equipo}.`)
      insertItems.area = true
      insertItems.device = true
    } else if (!equipo_check) {
      new_warning.push(`Se creará un nuevo elemento: ${form.equipo}.`)
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
    const resolve = resolveWarningRef.current
    resolveWarningRef.current = null
    resolve?.(true)
  }
  
  const handleWarningDecline = () => {
    setShowWarning(false)
    setWarning([])
    const resolve = resolveWarningRef.current
    resolveWarningRef.current = null
    resolve?.(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0]
      setFile(f)
      setFileName(f.name)
    } else {
      setFile(null)
      setFileName("No se ha seleccionado un archivo")
    }
  }
  const resetForm = () => {
    setError("")
    setTitle("")
    setReportDate(TODAY)
    setDescription("")
    setHoursCount("0")
    setCompany("")
    setArea("")
    setDevice("")
    setModel("")
    setFile(null)
    setFileName("No se ha seleccionado un archivo")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('leyendo')
    const form:FormType = {
      created_at: new Date(TODAY),
      titulo: title,
      fecha: reportDate,
      descripcion: description,
      empresa: company,
      area: area,
      equipo: device,
      modelo: model,
      conteo_horas: hoursCount,
      file: file,
      fileName: fileName 
    }

    if (!validateForm(form)) return
  
    console.log('form validado')

    const { insertItems: itemsToCreate, warnings } = checkFormWarnings(form)

    if (warnings.length > 0) {
      const accepted = await waitForWarningApproval()
      if (!accepted) return
    }

    
    setUploadMessage('Creando informe')

    if (itemsToCreate.company) {
      setUploadMessage('Creando empresa')
      const { data: equipoUploadData, error: EquipoUploadError } = await supabase
      .from('empresas')
      .insert({
        name: form.empresa
      })
  
      if (EquipoUploadError) throw EquipoUploadError
      setUploadMessage('Empresa creada')
    }

    if (itemsToCreate.area) {
      setUploadMessage('Creando area')
      const { data: areaUploadData, error: AreaUploadError } = await supabase
      .from('areas')
      .insert({
        name: form.area,
        empresa: form.empresa
      })
  
      if (AreaUploadError) throw AreaUploadError
      setUploadMessage('Area creada')
    }

    if (itemsToCreate.device) {
      setUploadMessage('Creando equipo')
      const { data: areaUploadData, error: EquipoUploadError } = await supabase
      .from('equipos')
      .insert({
        name: form.equipo,
        modelo: form.modelo,
        empresa: form.empresa,
        area: form.area
      })
  
      if (EquipoUploadError) throw EquipoUploadError
      setUploadMessage('Equipo creado')
    }

    if (!file) return

    setUploadMessage('Subiendo archivo')

    const fileExt = file.name.split('.').pop()
    const filePath = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      
    const { data: storageData, error: storageError } = await supabase.storage
      .from('Informes') // Reemplaza con el nombre de tu bucket
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
  
      if (storageError) throw storageError
    
    const { data } = supabase
      .storage
      .from('Informes')
      .getPublicUrl(filePath)
    
    const publicUrl = data.publicUrl

    setUploadMessage('Subiendo informe')
    const { data: areaUploadData, error: InformeUploadError } = await supabase
    .from('informes')
    .insert({
      titulo: form.titulo,
      fecha:form.fecha,
      descripcion: form.descripcion,
      empresa: form.empresa,
      area: form.area,
      equipo: form.equipo,
      conteo_horas: Number(form.conteo_horas),
      filepath: publicUrl
    })

    if (InformeUploadError) throw InformeUploadError
    resetForm()
    setUploadMessage('')
    pendingRefetchRef.current = true
    setNewReportCreated(true)
  }

  const handleCompanySelection = (new_empresa: string) => {
    setCompany(new_empresa)
    areasRefetch({empresa:new_empresa})
    equiposRefetch({empresa:new_empresa})
  }

  const handleAreaSelection = (new_area:string) => {
    setArea(new_area)
    const area = areas.find(a => a.name === new_area)
    if (area) {
      setCompany(area?.empresa || "")
    }
    equiposRefetch({area:new_area})
  }

  const handleDeviceSelection = (new_equipo:string) => {
    setDevice(new_equipo)
    const equipo=equipos.find(e => e.name === new_equipo)
    if (equipo) {
      setCompany(equipo?.empresa || "")
      setArea(equipo?.area || "")
      setModel(equipo?.modelo || "")
    }
  }

  return (
    <div className={`${styles.formContainer} flex flex-col w-full max-w-150 self-center px-5 md:px-0`}>
      <div className="flex gap-1 items-center md:w-full">
        <Image
          src="/icons/left_arrow_blue.svg"
          alt="Return"
          width={150}
          height={150}
          className="h-6 w-fit cursor-pointer align-baseline md:hidden"
          onClick={handleClose}
        />
        <h2 className="text-2xl font-semibold">Nuevo reporte</h2>
        <Image
          src="/icons/close_blue.svg"
          alt="Cerrar"
          width={150}
          height={150}
          className="hidden md:block md:h-8 md:w-fit md:cursor-pointer md:ml-auto md:hover:scale-110"
          onClick={handleClose}
        />
      </div>
      {!uploadMessage && 
      <form className="flex flex-col gap-3 mt-5 font-(--dark-blue)" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title">Título:<strong>*</strong></label>
          <input type="text" name="title" placeholder="Mantenimiento mensual" id="title" value={title} onChange={(e) => setTitle(e.target.value.trim())} className=" text-base border-b-3 border-(--dark-blue) focus:border-(--light-blue)"/>
        </div>
        <div className="">
          <label htmlFor="report-date">Fecha del reporte<strong>*</strong>:</label>
          <input type="date" name="report-date" id="report-date" value={reportDate} onChange={(e) => setReportDate(e.target.value.trim())} className="font-extralight border-b-3 border-(--dark-blue) focus:border-(--light-blue)"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            rows={3}
            className="
            w-full
            border-2
            border-(--dark-blue)
            rounded-sm
            text-sm
            p-3
            resize-none
            focus:outline-none
            focus:border-(--light-blue)
            focus:ring-blue-500
            "
            placeholder="Escribe aquí..."
          />
          <div className="text-right text-sm text-gray-500 self-end">
            {description.length}/100
          </div>
        </div>
        <div className="inline-flex flex-wrap items-center gap-2">
          <label htmlFor="hours-count">Conteo de horas:</label>
          <span className="inline-flex items-center border-b-3 border-(--dark-blue) focus-within:border-(--light-blue)">
            <input type="number" name="hours-count" id="hours-count" min={0} value={hoursCount} onChange={(e) => setHoursCount(e.target.value.trim())} className="no-spinner w-fit border-0 bg-transparent text-center focus:outline-none"/>
            <span className="text-(--dark-blue)">hrs</span>
          </span>
        </div>
        <div>
          <label htmlFor="report-company">Empresa<strong>*</strong>: </label>
          <DataList 
            options={empresas} 
            placeholder="Ingrese empresa" 
            state={company} 
            handleChange={handleCompanySelection} 
            id="report-company"
            key="empresa" 
            required/>
        </div>
        <div>
          <label htmlFor="report-area">Área: </label>
          <DataList 
          options={areas} 
          placeholder="(Opcional)" 
          state={area} 
          handleChange={handleAreaSelection} 
          id="report-area"
          key="area"/>
        </div>
        <div>
          <label htmlFor="report-device">Equipo<strong>*</strong>: </label>
          <DataList 
          options={equipos} 
          placeholder="Ingrese equipo" 
          state={device} 
          handleChange={handleDeviceSelection} 
          id="report-device"
          key="equipo" 
          required/>
        </div>
        
        <div>
          <label htmlFor="report-model">Modelo<strong>*</strong>: </label>
          <input type="text" name="report-model" id="report-model" placeholder="Modelo" value={model} onChange={(e) => setModel(e.target.value)} className="text-base border-b-3 border-(--dark-blue) focus:border-(--light-blue)" required/>
        </div>
        
        <div className="">
          <h3 className="text-md font-medium inline self-center">Archivo<strong>*</strong>:</h3>
          <label className="bg-(--dark-blue) w-fit px-3 py-1 text-white cursor-pointer hover:opacity-85 ml-3">
            {file ? "Cambiar archivo" : "Seleccionar archivo"}
            <input id="report-file" ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFileChange}/>
          </label>
        </div>
        <span className="ml-3 font-light">{fileName}</span>
        <div className="mt-10 flex justify-evenly">
          <button type="button" onClick={resetForm} className="border-red-500 border-3 w-fit text-red-500 self-center font-semibold px-6 py-2 rounded-4xl text-lg cursor-pointer hover:opacity-85 hover:bg-red-500 hover:text-white" >Reset</button>
          <button type="submit" className="bg-(--light-blue) w-fit text-white self-center font-semibold px-6 py-2 rounded-4xl border-3 border-(--light-blue) hover:border-(--dark-blue) text-lg cursor-pointer hover:bg-(--dark-blue)">Crear reporte</button>
        </div>
      </form>}
      {uploadMessage && 
      <div className="w-full h-full flex flex-col items-center py-40 text-(--dark-blue)">
        <Spinner size="lg" variant="ring"/>
        <p>{uploadMessage}</p>
      </div>
      }
      {error && <Alert type="error" message={error}/>}
      {showWarning && 
      <Alert type="warning" message="Tenga en cuanta la siguiente información.">
        <ul className="text-sm list-disc">
          {warning.map(m => <li key={m.length}>{m}</li>)}
        </ul>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleWarningAccept}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Continuar
          </button>
          <button
            type="button"
            onClick={handleWarningDecline}
            className="border-yellow-600 border text-yellow-700 px-3 py-1 rounded text-sm hover:bg-yellow-100"
          >
            Cancelar
          </button>
        </div>
      </Alert>}
      {newReportCreated && <Alert type="success" message="El reporte ha sido creado correctamente."/>}
    </div>
  )
}