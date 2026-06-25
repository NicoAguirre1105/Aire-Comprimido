'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'

const BASE_URL = 'https://www.airecomprimidoec.com'
import Aside from '../_components/aside'
import Header from '../_components/header'
import { useEmpresas } from '@/app/hooks/useEmpresas'
import { useAreas } from '@/app/hooks/useAreas'
import { useEquipos } from '@/app/hooks/useEquipos'
import { useAlert } from '@/app/hooks/useAlert'
import Alert from '@/app/_components/Alert'
import Loader from '@/app/_components/loader'
import QRCode from 'react-qr-code'

type ScopeType = 'todos' | 'empresa' | 'area' | 'equipo'
type LabelType = 'rectangular' | 'square'
type SquarePerPage = 4 | 6 | 12

type QRItem = {
  uuid: string
  name: string
  type: 'empresa' | 'area' | 'equipo'
  subtitle: string
}

const TYPE_LABEL: Record<QRItem['type'], string> = {
  empresa: 'Empresa',
  area: 'Área',
  equipo: 'Equipo',
}

// Shared gradient background canvas generator
async function makeGradientBg(widthMm: number, heightMm: number, scale = 4): Promise<string> {
  const cvW = Math.round(widthMm * scale)
  const cvH = Math.round(heightMm * scale)
  const cvR = 3 * scale
  const canvas = document.createElement('canvas')
  canvas.width = cvW
  canvas.height = cvH
  const ctx = canvas.getContext('2d')!
  ctx.beginPath()
  ctx.roundRect(0, 0, cvW, cvH, cvR)
  ctx.clip()
  const grad = ctx.createLinearGradient(0, 0, cvW, 0)
  grad.addColorStop(0,    '#0F172A')
  grad.addColorStop(0.50, '#1E3A8A')
  grad.addColorStop(1,    '#3B82F6')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, cvW, cvH)
  return canvas.toDataURL('image/png')
}

export default function GeneradorQR() {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const { alert, showAlert } = useAlert()

  // ── Scope ──────────────────────────────────────────────────────────────────
  const [scopeType, setScopeType] = useState<ScopeType>('todos')
  const [scopeEmpresa, setScopeEmpresa] = useState('')
  const [scopeArea, setScopeArea] = useState('')
  const [scopeEquipo, setScopeEquipo] = useState('')

  // ── Type filters ───────────────────────────────────────────────────────────
  const [inclEmpresas, setInclEmpresas] = useState(true)
  const [inclAreas, setInclAreas] = useState(true)
  const [inclEquipos, setInclEquipos] = useState(true)
  const [filterAreaEmpresa, setFilterAreaEmpresa] = useState('')
  const [filterEquipoEmpresa, setFilterEquipoEmpresa] = useState('')
  const [filterEquipoArea, setFilterEquipoArea] = useState('')

  // ── Label config ───────────────────────────────────────────────────────────
  const [labelType, setLabelType] = useState<LabelType>('rectangular')
  const [squarePerPage, setSquarePerPage] = useState<SquarePerPage>(6)

  // ── Removed items ──────────────────────────────────────────────────────────
  const [removedUuids, setRemovedUuids] = useState<Set<string>>(new Set())

  // ── Data ──────────────────────────────────────────────────────────────────
  const { data: empresas, loading: empLoading, error: empError } = useEmpresas()
  const { data: areas, loading: areasLoading, error: areasError } = useAreas()
  const { data: equipos, loading: equiposLoading, error: equiposError } = useEquipos()

  useEffect(() => {
    const err = empError || areasError || equiposError
    if (err) showAlert('error', err)
  }, [empError, areasError, equiposError, showAlert])

  // ── Scope dropdown options ─────────────────────────────────────────────────
  const scopeAreaOptions = useMemo(
    () => scopeEmpresa ? areas.filter(a => a.empresa === scopeEmpresa) : areas,
    [areas, scopeEmpresa]
  )
  const scopeEquipoOptions = useMemo(() => {
    let list = equipos
    if (scopeEmpresa) list = list.filter(e => e.empresa === scopeEmpresa)
    if (scopeArea) list = list.filter(e => e.area === scopeArea)
    return list
  }, [equipos, scopeEmpresa, scopeArea])

  const filterEquipoAreaOptions = useMemo(
    () => filterEquipoEmpresa ? areas.filter(a => a.empresa === filterEquipoEmpresa) : areas,
    [areas, filterEquipoEmpresa]
  )

  // ── Scope change handlers ──────────────────────────────────────────────────
  const handleScopeTypeChange = useCallback((type: ScopeType) => {
    setScopeType(type)
    setScopeEmpresa('')
    setScopeArea('')
    setScopeEquipo('')
    setFilterAreaEmpresa('')
    setFilterEquipoEmpresa('')
    setFilterEquipoArea('')
    setRemovedUuids(new Set())
  }, [])

  const handleScopeEmpresaChange = useCallback((name: string) => {
    setScopeEmpresa(name)
    setScopeArea('')
    setScopeEquipo('')
    setRemovedUuids(new Set())
  }, [])

  const handleScopeAreaChange = useCallback((name: string) => {
    setScopeArea(name)
    setScopeEquipo('')
    setRemovedUuids(new Set())
  }, [])

  // ── QR items derivation ────────────────────────────────────────────────────
  const allItems = useMemo((): QRItem[] => {
    const items: QRItem[] = []

    let empList = empresas
    let areaList = areas
    let equipoList = equipos

    if (scopeType === 'empresa' && scopeEmpresa) {
      empList = empresas.filter(e => e.name === scopeEmpresa)
      areaList = areas.filter(a => a.empresa === scopeEmpresa)
      equipoList = equipos.filter(e => e.empresa === scopeEmpresa)
    } else if (scopeType === 'area' && scopeEmpresa && scopeArea) {
      empList = []
      areaList = areas.filter(a => a.empresa === scopeEmpresa && a.name === scopeArea)
      equipoList = equipos.filter(e => e.empresa === scopeEmpresa && e.area === scopeArea)
    } else if (scopeType === 'equipo' && scopeEquipo) {
      empList = []
      areaList = []
      equipoList = equipos.filter(e =>
        e.name === scopeEquipo &&
        (!scopeEmpresa || e.empresa === scopeEmpresa) &&
        (!scopeArea || e.area === scopeArea)
      )
    }

    if (inclEmpresas && empList.length > 0) {
      empList.forEach(e => items.push({
        uuid: e.public_uuid, name: e.name, type: 'empresa', subtitle: 'Empresa',
      }))
    }

    if (inclAreas && areaList.length > 0) {
      let list = areaList
      if (scopeType === 'todos' && filterAreaEmpresa) {
        list = list.filter(a => a.empresa === filterAreaEmpresa)
      }
      list.forEach(a => items.push({
        uuid: a.public_uuid, name: a.name, type: 'area',
        subtitle: `Área · ${a.empresa}`,
      }))
    }

    if (inclEquipos && equipoList.length > 0) {
      let list = equipoList
      if (scopeType === 'todos') {
        if (filterEquipoEmpresa) list = list.filter(e => e.empresa === filterEquipoEmpresa)
        if (filterEquipoArea) list = list.filter(e => e.area === filterEquipoArea)
      } else if (scopeType === 'empresa' && filterEquipoArea) {
        list = list.filter(e => e.area === filterEquipoArea)
      }
      list.forEach(e => items.push({
        uuid: e.public_uuid, name: e.name, type: 'equipo',
        subtitle: [e.area, e.empresa].filter(Boolean).join(' · '),
      }))
    }

    return items
  }, [
    scopeType, scopeEmpresa, scopeArea, scopeEquipo,
    empresas, areas, equipos,
    inclEmpresas, inclAreas, inclEquipos,
    filterAreaEmpresa, filterEquipoEmpresa, filterEquipoArea,
  ])

  const displayItems = useMemo(
    () => allItems.filter(i => !removedUuids.has(i.uuid)),
    [allItems, removedUuids]
  )

  const removeItem = useCallback((uuid: string) => {
    setRemovedUuids(prev => new Set([...prev, uuid]))
  }, [])

  const restoreAll = useCallback(() => setRemovedUuids(new Set()), [])

  // ── PDF: etiqueta rectangular ──────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateRectangularPDF = useCallback(async (
    QRCodeLib: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsPDF: any,
    logoDataUrl: string,
    logoAspect: number,
  ) => {
    const pageW = 210, pageH = 297
    const margin = 12
    const cardW  = Math.round(pageW * 0.60)
    const cardX0 = (pageW - cardW) / 2
    const vPad   = 3.5
    const hPad   = 4
    const elemGap = 5
    const cardGap = 4
    const qrH = 28
    const cardH = qrH + 2 * vPad

    const logoH = qrH - 4
    const logoMaxW = 52
    let logoW = logoH * logoAspect
    if (logoW > logoMaxW) logoW = logoMaxW

    const textStartOffset = hPad + qrH + elemGap + logoW + elemGap
    const textColW = cardW - textStartOffset - hPad

    const fsType = 6.5, fsName = 10, fsSub = 7
    const mmPt   = 0.3528
    const lineType = fsType * mmPt + 1.0
    const lineName = fsName * mmPt + 1.5
    const lineSub  = fsSub  * mmPt + 1.2

    const cardsPerPage = Math.floor((pageH - 2 * margin + cardGap) / (cardH + cardGap))

    const bgDataUrl = await makeGradientBg(cardW, cardH)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    for (let i = 0; i < displayItems.length; i++) {
      const item = displayItems[i]
      const cardIndex = i % cardsPerPage
      if (i > 0 && cardIndex === 0) pdf.addPage()

      const cardX = cardX0
      const cardY = margin + cardIndex * (cardH + cardGap)

      pdf.addImage(bgDataUrl, 'PNG', cardX, cardY, cardW, cardH)
      pdf.setDrawColor(99, 160, 250)
      pdf.setLineWidth(0.25)
      pdf.roundedRect(cardX, cardY, cardW, cardH, 3, 3, 'S')

      const qrX = cardX + hPad
      const qrY = cardY + vPad
      const url = `${origin}/historial?uuid=${item.uuid}`
      const qrDataUrl = await QRCodeLib.default.toDataURL(url, {
        width: 300, margin: 1,
        color: { dark: '#FFFFFF', light: '#0F172A' },
      })
      pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrH, qrH)

      const logoX = qrX + qrH + elemGap
      const logoY = qrY + (qrH - logoH) / 2
      pdf.addImage(logoDataUrl, 'PNG', logoX, logoY, logoW, logoH)

      const tx = cardX + textStartOffset
      const hasSub = item.type !== 'empresa'
      const textBlockH = lineType + lineName + (hasSub ? lineSub : 0)
      let ty = qrY + (qrH - textBlockH) / 2

      pdf.setFontSize(fsType)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(200, 220, 255)
      pdf.text(TYPE_LABEL[item.type].toUpperCase(), tx, ty)
      ty += lineType

      pdf.setFontSize(fsName)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255)
      pdf.text(item.name, tx, ty, { maxWidth: textColW })
      ty += lineName

      if (hasSub) {
        const subParts = item.subtitle.split(' · ').slice(1)
        if (subParts.length > 0) {
          pdf.setFontSize(fsSub)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(255, 255, 255)
          pdf.text(subParts.join('\n'), tx, ty, { maxWidth: textColW })
        }
      }
    }

    pdf.save('qr-etiquetas-rectangular.pdf')
  }, [displayItems])

  // ── PDF: etiqueta cuadrada ─────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateSquarePDF = useCallback(async (
    QRCodeLib: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsPDF: any,
    logoDataUrl: string,
    logoAspect: number,
  ) => {
    const pageW = 210, pageH = 297
    const margin = 10
    const gap = 4

    const cols = squarePerPage === 12 ? 3 : 2
    const rows = squarePerPage === 4 ? 2 : squarePerPage === 6 ? 3 : 4

    const cardW = (pageW - 2 * margin - (cols - 1) * gap) / cols
    const cardH = (pageH - 2 * margin - (rows - 1) * gap) / rows

    const cardsPerPage = cols * rows

    // Padding interior de la card (proporcional al tamaño)
    const pad = cardW * 0.06          // ~6% del ancho → escala con el tamaño

    // Franja inferior: 30% del alto de la card
    const stripH = cardH * 0.30

    // Área del QR: todo el alto menos la franja y el padding superior
    const qrAreaH = cardH - stripH - pad
    // QR cuadrado: ocupa el ancho interior completo, limitado por la altura disponible
    const qrActualSize = Math.min(cardW - 2 * pad, qrAreaH)

    // Logo dentro de la franja — con padding interno en los 4 lados
    const logoPad = pad * 0.8
    const logoMaxH = stripH - 2 * logoPad
    const logoMaxW = cardW * 0.42
    let logoW = logoMaxH * logoAspect
    if (logoW > logoMaxW) logoW = logoMaxW
    const logoH = logoW / logoAspect

    // Fuentes proporcionales al cardW (en pt directamente)
    const fsType = Math.round(cardW * 0.110 * 10) / 10   // label tipo
    const fsName = Math.round(cardW * 0.150 * 10) / 10   // nombre
    const fsSub  = Math.round(cardW * 0.100 * 10) / 10   // subtítulo
    const mmPt   = 0.3528
    const lineType = fsType * mmPt + 1.0
    const lineName = fsName * mmPt + 1.2
    const lineSub2 = fsSub  * mmPt + 0.8

    // Pre-calcular background (igual para todas las cards de este tamaño)
    const bgDataUrl = await makeGradientBg(cardW, cardH)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    for (let i = 0; i < displayItems.length; i++) {
      const item = displayItems[i]
      const cardIndex = i % cardsPerPage
      const col = cardIndex % cols
      const row = Math.floor(cardIndex / cols)

      if (i > 0 && cardIndex === 0) pdf.addPage()

      const cardX = margin + col * (cardW + gap)
      const cardY = margin + row * (cardH + gap)

      // Fondo con gradiente
      pdf.addImage(bgDataUrl, 'PNG', cardX, cardY, cardW, cardH)
      pdf.setDrawColor(99, 160, 250)
      pdf.setLineWidth(0.25)
      pdf.roundedRect(cardX, cardY, cardW, cardH, 3, 3, 'S')

      // QR — centrado horizontal y verticalmente en el área superior
      const url = `${origin}/historial?uuid=${item.uuid}`
      const qrDataUrl = await QRCodeLib.default.toDataURL(url, {
        width: 512, margin: 1,
        color: { dark: '#FFFFFF', light: '#0F172A' },
      })
      const qrX = cardX + (cardW - qrActualSize) / 2
      const qrY = cardY + pad + (qrAreaH - qrActualSize) / 2
      pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrActualSize, qrActualSize)

      // Franja inferior
      const stripY = cardY + cardH - stripH

      // Logo — izquierda con padding uniforme
      const logoX = cardX + logoPad
      const logoY = stripY + (stripH - logoH) / 2
      pdf.addImage(logoDataUrl, 'PNG', logoX, logoY, logoW, logoH)

      // Texto — derecha, alineado a la derecha
      const textX = cardX + cardW - logoPad
      const textMaxW = cardW - logoW - logoPad * 3

      const hasSub = item.type !== 'empresa'
      const textBlockH = lineType + lineName + (hasSub ? lineSub2 : 0)
      // Alinear desde arriba con padding fijo para evitar desbordamiento inferior
      let ty = stripY + logoPad + (stripH - 2 * logoPad - textBlockH) / 2

      pdf.setFontSize(fsType)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(200, 220, 255)
      pdf.text(TYPE_LABEL[item.type].toUpperCase(), textX, ty, { align: 'right', maxWidth: textMaxW })
      ty += lineType

      pdf.setFontSize(fsName)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255)
      pdf.text(item.name, textX, ty, { align: 'right', maxWidth: textMaxW })
      ty += lineName

      if (hasSub) {
        const subParts = item.subtitle.split(' · ').slice(1)
        if (subParts.length > 0) {
          pdf.setFontSize(fsSub)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(200, 220, 255)
          pdf.text(subParts.join(' · '), textX, ty, { align: 'right', maxWidth: textMaxW })
        }
      }
    }

    pdf.save('qr-etiquetas-cuadrado.pdf')
  }, [displayItems, squarePerPage])

  // ── PDF download dispatcher ────────────────────────────────────────────────
  const handleDownloadPDF = useCallback(async () => {
    if (displayItems.length === 0) return

    try {
      const [QRCodeLib, { jsPDF }] = await Promise.all([
        import('qrcode'),
        import('jspdf'),
      ])

      const logoDataUrl = await fetch('/logos/logo_white.png')
        .then(r => r.blob())
        .then(blob => new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))

      const logoImg = new Image()
      await new Promise<void>(resolve => {
        logoImg.onload = () => resolve()
        logoImg.src = logoDataUrl
      })
      const logoAspect = logoImg.naturalWidth / logoImg.naturalHeight

      if (labelType === 'rectangular') {
        await generateRectangularPDF(QRCodeLib, jsPDF, logoDataUrl, logoAspect)
      } else {
        await generateSquarePDF(QRCodeLib, jsPDF, logoDataUrl, logoAspect)
      }
    } catch {
      showAlert('error', 'No se pudo generar el PDF. Intente nuevamente.')
    }
  }, [displayItems, labelType, generateRectangularPDF, generateSquarePDF, showAlert])

  // ── Derived UI flags ───────────────────────────────────────────────────────
  const canIncludeEmpresas = scopeType === 'todos' || scopeType === 'empresa'
  const canIncludeAreas = scopeType !== 'equipo'
  const loading = empLoading || areasLoading || equiposLoading

  const selectStyle = 'border border-gray-300 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-dark-blue'
  const chipBtn = (active: boolean) =>
    `px-3 py-1.5 rounded text-sm font-medium border transition-all cursor-pointer ${
      active
        ? 'bg-dark-blue text-white border-dark-blue'
        : 'bg-white text-dark-blue border-gray-300 hover:border-dark-blue'
    }`

  if (loading) return <Loader />

  const toggleAside = () => setIsAsideOpen(p => !p)

  return (
    <div className="flex min-h-full flex-1">
      <Aside isOpen={isAsideOpen} toggleAside={toggleAside} />
      <div className="flex w-full flex-col overflow-x-hidden">
        <Header title="Generador QR" toggleAside={toggleAside} />

        <main className="relative flex flex-col mt-[4.5rem] px-5 py-10 md:mt-0 sm:px-10 max-w-[100rem]">
          {alert && <Alert type={alert.type} message={alert.message} />}

          <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:gap-6">

            {/* ── Panel: Alcance ────────────────────────────────────────────── */}
            <section className="border border-gray-200 rounded-lg p-4 flex-1">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Alcance</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {(['todos', 'empresa', 'area', 'equipo'] as ScopeType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => handleScopeTypeChange(type)}
                    className={chipBtn(scopeType === type)}
                  >
                    {type === 'todos' ? 'Todos' : type === 'empresa' ? 'Empresa' : type === 'area' ? 'Área' : 'Equipo'}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {(scopeType === 'empresa' || scopeType === 'area' || scopeType === 'equipo') && (
                  <select value={scopeEmpresa} onChange={e => handleScopeEmpresaChange(e.target.value)} className={selectStyle}>
                    <option value="">Seleccionar empresa...</option>
                    {empresas.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                  </select>
                )}

                {(scopeType === 'area' || scopeType === 'equipo') && scopeEmpresa && (
                  <select value={scopeArea} onChange={e => handleScopeAreaChange(e.target.value)} className={selectStyle}>
                    <option value="">Seleccionar área...</option>
                    {scopeAreaOptions.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                  </select>
                )}

                {scopeType === 'equipo' && scopeArea && (
                  <select
                    value={scopeEquipo}
                    onChange={e => { setScopeEquipo(e.target.value); setRemovedUuids(new Set()) }}
                    className={selectStyle}
                  >
                    <option value="">Seleccionar equipo...</option>
                    {scopeEquipoOptions.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                  </select>
                )}
              </div>
            </section>

            {/* ── Panel: Tipos ──────────────────────────────────────────────── */}
            <section className="border border-gray-200 rounded-lg p-4 flex-1">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Incluir en el PDF</h2>

              <div className="flex flex-col gap-3.5">

                {canIncludeEmpresas && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="flex items-center gap-2 w-24 cursor-pointer select-none">
                      <input type="checkbox" checked={inclEmpresas} onChange={e => setInclEmpresas(e.target.checked)} className="accent-dark-blue w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Empresas</span>
                    </label>
                    {inclEmpresas && scopeType === 'empresa' && scopeEmpresa && (
                      <span className="text-xs text-gray-400">· {scopeEmpresa}</span>
                    )}
                  </div>
                )}

                {canIncludeAreas && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="flex items-center gap-2 w-24 cursor-pointer select-none">
                      <input type="checkbox" checked={inclAreas} onChange={e => setInclAreas(e.target.checked)} className="accent-dark-blue w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Áreas</span>
                    </label>
                    {inclAreas && scopeType === 'todos' && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <span>de</span>
                        <select value={filterAreaEmpresa} onChange={e => setFilterAreaEmpresa(e.target.value)} className={selectStyle}>
                          <option value="">Todas las empresas</option>
                          {empresas.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                        </select>
                      </div>
                    )}
                    {inclAreas && scopeType === 'empresa' && scopeEmpresa && (
                      <span className="text-xs text-gray-400">de {scopeEmpresa}</span>
                    )}
                    {inclAreas && scopeType === 'area' && scopeArea && (
                      <span className="text-xs text-gray-400">· {scopeArea}</span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                  <label className="flex items-center gap-2 w-24 cursor-pointer select-none">
                    <input type="checkbox" checked={inclEquipos} onChange={e => setInclEquipos(e.target.checked)} className="accent-dark-blue w-3.5 h-3.5" />
                    <span className="text-sm font-medium">Equipos</span>
                  </label>

                  {inclEquipos && scopeType === 'todos' && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
                      <span>de</span>
                      <select value={filterEquipoEmpresa} onChange={e => { setFilterEquipoEmpresa(e.target.value); setFilterEquipoArea('') }} className={selectStyle}>
                        <option value="">Todas las empresas</option>
                        {empresas.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                      </select>
                      {filterEquipoEmpresa && (
                        <>
                          <span>/</span>
                          <select value={filterEquipoArea} onChange={e => setFilterEquipoArea(e.target.value)} className={selectStyle}>
                            <option value="">Todas las áreas</option>
                            {filterEquipoAreaOptions.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                          </select>
                        </>
                      )}
                    </div>
                  )}

                  {inclEquipos && scopeType === 'empresa' && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
                      {scopeEmpresa && <span className="text-xs text-gray-400">de {scopeEmpresa} /</span>}
                      <select value={filterEquipoArea} onChange={e => setFilterEquipoArea(e.target.value)} disabled={!scopeEmpresa} className={`${selectStyle} disabled:opacity-40`}>
                        <option value="">Todas las áreas</option>
                        {scopeAreaOptions.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                      </select>
                    </div>
                  )}

                  {inclEquipos && (scopeType === 'area' || scopeType === 'equipo') && scopeArea && (
                    <span className="text-xs text-gray-400">de {scopeArea}</span>
                  )}
                </div>

              </div>
            </section>

            {/* ── Panel: Configuración de etiqueta ──────────────────────────── */}
            <section className="border border-gray-200 rounded-lg p-4 flex-1">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tipo de etiqueta</h2>

              <div className="flex flex-col gap-4">
                {/* Selector de tipo */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLabelType('rectangular')}
                    className={`flex-1 flex flex-col items-center gap-1.5 border rounded-lg p-3 cursor-pointer transition-all ${
                      labelType === 'rectangular'
                        ? 'border-dark-blue bg-dark-blue/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Rectangular preview */}
                    <div className={`w-14 h-7 rounded flex items-center gap-1 px-1 ${labelType === 'rectangular' ? 'bg-dark-blue' : 'bg-gray-200'}`}>
                      <div className="w-5 h-5 bg-white/30 rounded-sm shrink-0" />
                      <div className="flex flex-col gap-0.5 flex-1">
                        <div className="h-1 bg-white/40 rounded-full w-full" />
                        <div className="h-1 bg-white/25 rounded-full w-3/4" />
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${labelType === 'rectangular' ? 'text-dark-blue' : 'text-gray-500'}`}>Rectangular</span>
                  </button>

                  <button
                    onClick={() => setLabelType('square')}
                    className={`flex-1 flex flex-col items-center gap-1.5 border rounded-lg p-3 cursor-pointer transition-all ${
                      labelType === 'square'
                        ? 'border-dark-blue bg-dark-blue/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Square preview */}
                    <div className={`w-9 h-9 rounded flex flex-col items-center gap-0.5 p-1 ${labelType === 'square' ? 'bg-dark-blue' : 'bg-gray-200'}`}>
                      <div className="w-full flex-1 bg-white/30 rounded-sm" />
                      <div className="w-full flex gap-0.5 items-center">
                        <div className="h-2 bg-white/40 rounded-sm flex-1" />
                        <div className="h-2 bg-white/25 rounded-sm flex-1" />
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${labelType === 'square' ? 'text-dark-blue' : 'text-gray-500'}`}>Cuadrado</span>
                  </button>
                </div>

                {/* QR por página (solo cuadrado) */}
                {labelType === 'square' && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">QR por página</p>
                    <div className="flex gap-2">
                      {([4, 6, 12] as SquarePerPage[]).map(n => (
                        <button
                          key={n}
                          onClick={() => setSquarePerPage(n)}
                          className={`flex-1 py-1.5 rounded border text-sm font-semibold cursor-pointer transition-all ${
                            squarePerPage === n
                              ? 'bg-dark-blue text-white border-dark-blue'
                              : 'bg-white text-gray-600 border-gray-300 hover:border-dark-blue'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      {squarePerPage === 4 ? '2 columnas × 2 filas'
                        : squarePerPage === 6 ? '2 columnas × 3 filas'
                        : '3 columnas × 4 filas'}
                    </p>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* ── Barra de acciones ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-dark-blue">{displayItems.length}</span>{' '}
              código{displayItems.length !== 1 ? 's' : ''} seleccionado{displayItems.length !== 1 ? 's' : ''}
              {removedUuids.size > 0 && (
                <button
                  onClick={restoreAll}
                  className="ml-3 text-light-blue underline text-xs cursor-pointer hover:opacity-75"
                >
                  Restaurar {removedUuids.size} eliminado{removedUuids.size !== 1 ? 's' : ''}
                </button>
              )}
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={displayItems.length === 0}
              className="bg-dark-blue text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-85 disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              Descargar PDF
            </button>
          </div>

          {/* ── Grid de QRs ───────────────────────────────────────────────────── */}
          {displayItems.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
              {scopeType === 'equipo' && !scopeEquipo
                ? 'Selecciona un equipo para ver su código QR.'
                : scopeType === 'area' && !scopeArea
                ? 'Selecciona un área para ver sus códigos QR.'
                : scopeType === 'empresa' && !scopeEmpresa
                ? 'Selecciona una empresa para ver sus códigos QR.'
                : 'No hay códigos QR con la selección actual.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {displayItems.map(item => (
                <div
                  key={item.uuid}
                  className="border border-gray-200 rounded-lg p-3 flex flex-col items-center gap-2 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      {TYPE_LABEL[item.type]}
                    </span>
                    <button
                      onClick={() => removeItem(item.uuid)}
                      title="Quitar de la selección"
                      className="text-brand-red hover:text-red-700 cursor-pointer transition-colors duration-150"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full p-1">
                    <QRCode
                      value={`${BASE_URL}/historial?uuid=${item.uuid}`}
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      viewBox="0 0 256 256"
                    />
                  </div>

                  <div className="text-center w-full">
                    <p className="text-xs font-semibold text-dark-blue leading-tight line-clamp-2">{item.name}</p>
                    {item.type !== 'empresa' && (
                      <p className="text-[10px] text-gray-400 leading-tight line-clamp-1 mt-0.5">
                        {item.subtitle.split(' · ').slice(1).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
