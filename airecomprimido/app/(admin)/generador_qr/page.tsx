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

  // ── Removed items ──────────────────────────────────────────────────────────
  const [removedUuids, setRemovedUuids] = useState<Set<string>>(new Set())

  // ── Data (always fetch everything, filter client-side) ─────────────────────
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

  // ── Type filter dropdown options ───────────────────────────────────────────
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

  // ── PDF download ───────────────────────────────────────────────────────────
  const handleDownloadPDF = useCallback(async () => {
    if (displayItems.length === 0 || !origin) return

    try {
      const [QRCodeLib, { jsPDF }] = await Promise.all([
        import('qrcode'),
        import('jspdf'),
      ])

      // Load logo_white
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

      // ── Layout constants ────────────────────────────────────────────────────
      const pageW = 210, pageH = 297
      const margin = 12
      const cardW  = Math.round(pageW * 0.60)           // 60% de A4 = 126 mm
      const cardX0 = (pageW - cardW) / 2               // centrado horizontal
      const vPad   = 3.5                  // vertical padding inside card
      const hPad   = 4                    // horizontal padding inside card
      const elemGap = 5                   // gap between QR | logo | text
      const cardGap = 4                   // vertical gap between cards

      const qrH = 28                      // QR height (and target logo height)
      const cardH = qrH + 2 * vPad       // ≈ 35mm

      // Logo: 2 mm shorter each side than QR (= 4 mm less total), centered vertically
      const logoH = qrH - 4
      const logoMaxW = 52
      let logoW = logoH * logoAspect
      if (logoW > logoMaxW) logoW = logoMaxW

      // Text column starts after QR + logo + gaps
      const textStartOffset = hPad + qrH + elemGap + logoW + elemGap
      const textColW = cardW - textStartOffset - hPad

      // Font sizes (fixed, not proportional to card)
      const fsType = 6.5, fsName = 10, fsSub = 7
      const mmPt   = 0.3528
      const lineType = fsType * mmPt + 1.0
      const lineName = fsName * mmPt + 1.5
      const lineSub  = fsSub  * mmPt + 1.2

      // Cards per page
      const cardsPerPage = Math.floor((pageH - 2 * margin + cardGap) / (cardH + cardGap))

      // ── Pre-render card background once using Canvas 2D ─────────────────────
      // Canvas API handles gradient + border-radius natively and reliably.
      const BG_SCALE = 4           // px per mm (≈150 dpi)
      const cvW = Math.round(cardW * BG_SCALE)
      const cvH = Math.round(cardH * BG_SCALE)
      const cvR = 3 * BG_SCALE     // corner radius in px

      const bgCanvas = document.createElement('canvas')
      bgCanvas.width  = cvW
      bgCanvas.height = cvH
      const ctx = bgCanvas.getContext('2d')!

      // Rounded rect clip path
      ctx.beginPath()
      ctx.roundRect(0, 0, cvW, cvH, cvR)
      ctx.clip()

      // Linear gradient: #0F172A → #1E3A8A → #3B82F6
      const grad = ctx.createLinearGradient(0, 0, cvW, 0)
      grad.addColorStop(0,    '#0F172A')
      grad.addColorStop(0.50, '#1E3A8A')
      grad.addColorStop(1,    '#3B82F6')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, cvW, cvH)

      const bgDataUrl = bgCanvas.toDataURL('image/png')

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      for (let i = 0; i < displayItems.length; i++) {
        const item = displayItems[i]
        const cardIndex = i % cardsPerPage

        if (i > 0 && cardIndex === 0) pdf.addPage()

        const cardX = cardX0
        const cardY = margin + cardIndex * (cardH + cardGap)

        // ── Background image (gradient + rounded corners) ─────────────────────
        pdf.addImage(bgDataUrl, 'PNG', cardX, cardY, cardW, cardH)

        // Rounded border (light blue, thin)
        pdf.setDrawColor(99, 160, 250)
        pdf.setLineWidth(0.25)
        pdf.roundedRect(cardX, cardY, cardW, cardH, 3, 3, 'S')

        // ── QR (white modules on #0F172A background) ─────────────────────────
        const qrX = cardX + hPad
        const qrY = cardY + vPad
        const url = `${origin}/historial?uuid=${item.uuid}`
        const qrDataUrl = await QRCodeLib.default.toDataURL(url, {
          width: 300, margin: 1,
          color: { dark: '#FFFFFF', light: '#0F172A' },
        })
        pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrH, qrH)

        // ── Logo (white, same height as QR) ──────────────────────────────────
        const logoX = qrX + qrH + elemGap
        const logoY = qrY + (qrH - logoH) / 2
        pdf.addImage(logoDataUrl, 'PNG', logoX, logoY, logoW, logoH)

        // ── Text (white / light blue tones) ──────────────────────────────────
        const tx = cardX + textStartOffset
        const hasSub = item.type !== 'empresa'
        const textBlockH = lineType + lineName + (hasSub ? lineSub : 0)
        let ty = qrY + (qrH - textBlockH) / 2

        pdf.setFontSize(fsType)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(200, 220, 255)   // blanco-azulado suave — tipo label
        pdf.text(TYPE_LABEL[item.type].toUpperCase(), tx, ty)
        ty += lineType

        pdf.setFontSize(fsName)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 255, 255)   // blanco — nombre
        pdf.text(item.name, tx, ty, { maxWidth: textColW })
        ty += lineName

        if (hasSub) {
          const subParts = item.subtitle.split(' · ').slice(1)
          if (subParts.length > 0) {
            pdf.setFontSize(fsSub)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(255, 255, 255)   // blanco — subtítulo
            pdf.text(subParts.join('\n'), tx, ty, { maxWidth: textColW })
          }
        }
      }

      pdf.save('qr-historial.pdf')
    } catch {
      showAlert('error', 'No se pudo generar el PDF. Intente nuevamente.')
    }
  }, [displayItems, origin, showAlert])

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

                {/* Empresas */}
                {canIncludeEmpresas && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="flex items-center gap-2 w-24 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={inclEmpresas}
                        onChange={e => setInclEmpresas(e.target.checked)}
                        className="accent-dark-blue w-3.5 h-3.5"
                      />
                      <span className="text-sm font-medium">Empresas</span>
                    </label>
                    {inclEmpresas && scopeType === 'empresa' && scopeEmpresa && (
                      <span className="text-xs text-gray-400">· {scopeEmpresa}</span>
                    )}
                  </div>
                )}

                {/* Áreas */}
                {canIncludeAreas && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="flex items-center gap-2 w-24 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={inclAreas}
                        onChange={e => setInclAreas(e.target.checked)}
                        className="accent-dark-blue w-3.5 h-3.5"
                      />
                      <span className="text-sm font-medium">Áreas</span>
                    </label>
                    {inclAreas && scopeType === 'todos' && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <span>de</span>
                        <select
                          value={filterAreaEmpresa}
                          onChange={e => setFilterAreaEmpresa(e.target.value)}
                          className={selectStyle}
                        >
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

                {/* Equipos */}
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="flex items-center gap-2 w-24 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={inclEquipos}
                      onChange={e => setInclEquipos(e.target.checked)}
                      className="accent-dark-blue w-3.5 h-3.5"
                    />
                    <span className="text-sm font-medium">Equipos</span>
                  </label>

                  {inclEquipos && scopeType === 'todos' && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
                      <span>de</span>
                      <select
                        value={filterEquipoEmpresa}
                        onChange={e => { setFilterEquipoEmpresa(e.target.value); setFilterEquipoArea('') }}
                        className={selectStyle}
                      >
                        <option value="">Todas las empresas</option>
                        {empresas.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                      </select>
                      {filterEquipoEmpresa && (
                        <>
                          <span>/</span>
                          <select
                            value={filterEquipoArea}
                            onChange={e => setFilterEquipoArea(e.target.value)}
                            className={selectStyle}
                          >
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
                      <select
                        value={filterEquipoArea}
                        onChange={e => setFilterEquipoArea(e.target.value)}
                        disabled={!scopeEmpresa}
                        className={`${selectStyle} disabled:opacity-40`}
                      >
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
