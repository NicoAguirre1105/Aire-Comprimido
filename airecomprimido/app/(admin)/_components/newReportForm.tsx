'use client'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import styles from "../_styles/newReport.module.css"

const TODAY = new Date().toISOString().split("T")[0]
const FIVE_YEARS_AGO = (() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 5)
  return d.toISOString().split("T")[0]
})()

export default function NewReportForm({
  handleNewReport
}:{
  handleNewReport: () => void
}) {
  // normal --> añade un reporte a un equipo existente
  // new-company --> nueva empresa (subgroup opcional)
  // new-subgroup --> nuevo subgrupo (subgroup obligatorio)
  // new-device --> nuevo equipo en empresa existente
  const [formMode, setFormMode] = useState<"normal" | "new-company" | "new-subgroup" | "new-device">("normal")
  const [error, setError] = useState("")

  // Estados para envío a API
  const [title, setTitle] = useState("")
  const [reportDate, setReportDate] = useState(TODAY)
  const [hoursCount, setHoursCount] = useState("0")
  const [company, setCompany] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [subgroup, setSubgroup] = useState("")
  const [newSubgroup, setNewSubgroup] = useState("")
  const [device, setDevice] = useState("")
  const [newDevice, setNewDevice] = useState("")
  const [newModel, setNewModel] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("No se ha seleccionado un archivo")
  const [buttonTitle, setButtonTitle] = useState("Seleccione archivo")

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cierre automático de la ventana de error a los 4 s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  function validateForm(): boolean {
    setError("")

    if (!title.trim()) {
      setError("!! El título es obligatorio.")
      return false
    }
    if (!reportDate.trim()) {
      setError("!! La fecha del reporte es obligatoria.")
      return false
    }
    const date = new Date(reportDate)
    const todayDate = new Date(TODAY)
    const fiveYearsAgoDate = new Date(FIVE_YEARS_AGO)
    if (date > todayDate) {
      setError("!! La fecha no puede ser mayor a la fecha actual.")
      return false
    }
    if (date < fiveYearsAgoDate) {
      setError("!! La fecha no puede ser anterior a 5 años.")
      return false
    }
    const hours = Number(hoursCount)
    if (Number.isNaN(hours) || hours < 0) {
      setError("!! El conteo de horas debe ser mayor a 0.")
      return false
    }
    if (!file) {
      setError("!! Debe adjuntar un archivo.")
      return false
    }
    if (file.type !== "application/pdf") {
      setError("!! Solo se permiten archivos PDF.")
      return false
    }
    if (formMode === "new-company") {
      if (!newCompany.trim()) {
        setError("!! El nombre de la empresa es obligatorio.")
        return false
      }
      // subgroup opcional en new-company
      if (!newDevice.trim()) {
        setError("!! El equipo es obligatorio.")
        return false
      }
      if (!newModel.trim()) {
        setError("!! El modelo es obligatorio.")
        return false
      }
    } else if (formMode === "new-subgroup") {
      if (!newSubgroup.trim()) {
        setError("!! El subgrupo es obligatorio.")
        return false
      }
      if (!newDevice.trim()) {
        setError("!! El equipo es obligatorio.")
        return false
      }
      if (!newModel.trim()) {
        setError("!! El modelo es obligatorio.")
        return false
      }
    } else if (formMode === "new-device") {
      if (!newDevice.trim()) {
        setError("!! El equipo es obligatorio.")
        return false
      }
      if (!newModel.trim()) {
        setError("!! El modelo es obligatorio.")
        return false
      }
    } else {
      if (!company || company === "") {
        setError("!! Debe seleccionar una empresa.")
        return false
      }
      // Subgrupo obligatorio solo si la empresa tiene subgrupos (no en new-company ni cuando groupList está vacío)
      const subgroupRequired = groupList.length > 0
      if (subgroupRequired && !subgroup.trim()) {
        setError("!! Debe seleccionar un subgrupo.")
        return false
      }
      if (!device || device === "") {
        setError("!! Debe seleccionar un equipo.")
        return false
      }
    }

    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0]
      setFile(f)
      setFileName(f.name)
      setButtonTitle("Cambiar archivo")
    } else {
      setFile(null)
      setFileName("No se ha seleccionado un archivo")
      setButtonTitle("Seleccione archivo")
    }
  }

  const handleMode = (mode: "normal" | "new-company" | "new-subgroup" | "new-device") => {
    setFormMode(mode)
    setError("")
  }

  const resetForm = () => {
    setFormMode("normal")
    setError("")
    setTitle("")
    setReportDate(TODAY)
    setHoursCount("0")
    setCompany("")
    setNewCompany("")
    setSubgroup("")
    setNewSubgroup("")
    setDevice("")
    setNewDevice("")
    setNewModel("")
    setFile(null)
    setFileName("No se ha seleccionado un archivo")
    setButtonTitle("Seleccione archivo")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    // TODO: enviar a API con title, reportDate, hoursCount, company/newCompany, subgroup/newSubgroup, device/newDevice, newModel, file
  }

  const companyList = [
    {id: 1, label: "Company A"},
    {id: 2, label: "Company B"},
    {id: 3, label: "Company CCCCCCCCCC"},
    {id: 4, label: "Company D"}]
  
  const groupList: { id: number; label: string }[] = []
  
  const deviceList = [
    {id: 1, label: "Device A"},
    {id: 2, label: "Device 33333333333"},
    {id: 3, label: "Device C4"},
    {id: 4, label: "Device D55"}]

  return (
    <div className={`${styles.formContainer} w-full max-w-150 self-center px-5 md:px-0`}>
      <div className="flex gap-1 items-center md:w-full">
        <Image
          src="/icons/left_arrow_blue.svg"
          alt="Return"
          width={150}
          height={150}
          className="h-6 w-fit cursor-pointer align-baseline md:hidden"
          onClick={handleNewReport}
        />
        <h2 className="text-2xl font-semibold">Nuevo reporte</h2>
        <Image
          src="/icons/close_blue.svg"
          alt="Cerrar"
          width={150}
          height={150}
          className="hidden md:block md:h-8 md:w-fit md:cursor-pointer md:ml-auto md:hover:scale-110"
          onClick={handleNewReport}
        />
      </div>
      <form className="flex flex-col gap-2 mt-5 font-(--dark-blue)" onSubmit={handleSubmit}>
        <label htmlFor="title">Título<strong>*</strong></label>
        <input type="text" name="title" placeholder="Mantenimiento mensual" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className=" text-base border-b-3 border-(--dark-blue) focus:border-(--light-blue)"/>
        <div className="">
          <label htmlFor="report-date">Fecha del reporte<strong>*</strong>:</label>
          <input type="date" name="report-date" id="report-date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className="font-extralight border-b-3 border-(--dark-blue) focus:border-(--light-blue)"/>
        </div>
        <div className="inline-flex flex-wrap items-center gap-2">
          <label htmlFor="hours-count">Conteo de horas:</label>
          <span className="inline-flex items-center border-b-3 border-(--dark-blue) focus-within:border-(--light-blue)">
            <input type="number" name="hours-count" id="hours-count" min={0} value={hoursCount} onChange={(e) => setHoursCount(e.target.value)} className="no-spinner w-fit border-0 bg-transparent text-center focus:outline-none"/>
            <span className="text-(--dark-blue)">hrs</span>
          </span>
        </div>
        <div>
          {formMode !== "new-company" ? 
          <>
            <label htmlFor="report-company">Seleccione empresa<strong>*</strong>: </label>
            <select name="company" id="report-company" value={company} onChange={(e) => { const v = e.target.value; if (v === "__new_company__") { handleMode("new-company"); setCompany(""); } else setCompany(v); }}>
              <option value="">Empresa</option>
              {companyList.map(c => (
                <option key={c.id} value={String(c.id)}>{c.label}</option>
              ))}             
              <option value="__new_company__">+ Nuevo</option>
            </select> 
          </>
          : 
          <>
            <label htmlFor="new-company">Ingrese empresa<strong>*</strong>: </label>
            <input type="text" name="new-company" id="new-company" placeholder="Empresa nueva" value={newCompany} onChange={(e) => setNewCompany(e.target.value)}/>
          </>
          }
        </div>
        { (formMode === "new-company" || formMode === "new-subgroup") && 
          <div>
            <label htmlFor="new-subgroup">Ingrese subgrupo{formMode === "new-subgroup" && <strong>*</strong>}: </label>
            <input type="text" name="new-subgroup" id="new-subgroup" placeholder={"Subgrupo (opcional)"} value={newSubgroup} onChange={(e) => setNewSubgroup(e.target.value)}/>
          </div> 
        }
        { formMode !== "new-company" && formMode !== "new-subgroup" && (
        <div>
          <label htmlFor="report-subgroup">
            Seleccione subgrupo{groupList.length > 0 && <strong>*</strong>}:{" "}
          </label>
          <select name="subgroup" id="report-subgroup" value={subgroup} onChange={(e) => { const v = e.target.value; if (v === "__new_subgroup__") { handleMode("new-subgroup"); setSubgroup(""); } else setSubgroup(v); }}>
            <option value="">{groupList.length === 0 ? "Ninguno" : "Subgrupo"}</option>
            {groupList.map(g => (
              <option key={g.id} value={String(g.id)}>{g.label}</option>
            ))}
            <option value="__new_subgroup__">+ Nuevo</option>
          </select>
        </div>
        )}
        { (formMode === "new-device" || formMode === "new-company" || formMode === "new-subgroup") ? 
        <>
        <div>
        <label htmlFor="new-device">Ingrese equipo<strong>*</strong>: </label>
        <input type="text" name="new-device" id="new-device" placeholder="Equipo nuevo" value={newDevice} onChange={(e) => setNewDevice(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="new-model">Ingrese modelo<strong>*</strong>: </label>
          <input type="text" name="new-model" id="new-model" placeholder="Modelo" value={newModel} onChange={(e) => setNewModel(e.target.value)}/>
        </div>
        </>
        :
        <div>
          <label htmlFor="report-device">Seleccione equipo<strong>*</strong>: </label>
          <select name="device" id="report-device" value={device} onChange={(e) => { const v = e.target.value; if (v === "__new_device__") { handleMode("new-device"); setDevice(""); } else setDevice(v); }}>
            <option value="">Equipo</option>
            {deviceList.map(d => (
              <option key={d.id} value={String(d.id)}>{d.label}</option>
            ))}             
            <option value="__new_device__">+ Nuevo</option>
          </select>
        </div>
        }
        <div className="">
          <h3 className="text-md font-medium inline self-center">Archivo:</h3>
          <label className="bg-(--dark-blue) w-fit px-3 py-1 text-white cursor-pointer hover:opacity-85 ml-3">
            {buttonTitle}
            <input id="report-file" ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFileChange}/>
          </label>
        </div>
        <span className="ml-3 font-light">{fileName}</span>
        <div className="mt-10 flex justify-evenly">
          <button type="button" onClick={resetForm} className="border-red-500 border-3 w-fit text-red-500 self-center font-semibold px-6 py-2 rounded-4xl text-lg cursor-pointer hover:opacity-85 hover:bg-red-500 hover:text-white" >Reset</button>
          <button type="submit" className="bg-(--light-blue) w-fit text-white self-center font-semibold px-6 py-2 rounded-4xl border-3 border-(--light-blue) hover:border-(--dark-blue) text-lg cursor-pointer hover:bg-(--dark-blue)">Crear reporte</button>
        </div>
      </form>
      {error && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-baseline md:items-end md:justify-end p-3 md:p-4 md:bg-black/50"
          onClick={() => setError("")}
          role="dialog"
          aria-modal="true"
          aria-labelledby="error-title"
          aria-describedby="error-message"
        >
          <div
            className="md:rounded-sm shadow-xl w-full md:w-80 p-5 pl-10 bg-red-100 md:bg-red-50 md:border-3 md:border-red-500"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/icons/close_red.svg"
              alt="Cerrar"
              width={150}
              height={150}
              className=" absolute h-8 w-fit cursor-pointer right-10 hover:scale-110 md:h-7 md:bottom-21"
              onClick={() => {setError("")}}
            />
            <h3 id="error-title" className="text-xl font-bold text-red-500 mb-2">Error!!</h3>
            <p id="error-message" className="text-red-500 mb-3">{error.replace(/^!!\s*/, "")}</p>
          </div>
        </div>
      )}
    </div>
  )
}