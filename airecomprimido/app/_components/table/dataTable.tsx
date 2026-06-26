import { useViewport } from "@/app/_context/ViewportContext";

type Column = {
  key: string,
  label: string
}

type TablePagination = {
  page: number
  totalPages: number
  totalCount: number
  pageSize: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

interface DataTableProps<T extends Record<string, unknown> & { id: number | string }> {
  columns: Column[];
  data: T[];
  pagination?: TablePagination;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function renderCell(val: unknown): React.ReactNode {
  if (val === null || val === undefined || val === 0 || val === '') return <span className="text-slate-300">—</span>
  return String(val)
}

function IconOpen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

function IconEdit() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
  )
}

function IconDelete() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  )
}

function TablePaginationControls({ pagination }: { pagination: TablePagination }) {
  const { page, totalPages, totalCount, pageSize, onPageChange, isLoading } = pagination
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  return (
    <nav
      className="flex flex-col items-center gap-3 px-4 py-3 border-t border-slate-100 sm:flex-row sm:justify-between"
      aria-label="Paginación de reportes"
    >
      <p className="text-sm text-slate-500">
        {totalCount === 0 ? 'Sin reportes' : `Mostrando ${from}–${to} de ${totalCount}`}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isLoading}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Anterior
        </button>
        <span className="text-sm font-medium min-w-[6rem] text-center text-slate-500">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || isLoading}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Siguiente
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-sm font-medium">No se encontraron reportes</p>
      <p className="text-xs">Intenta ajustar los filtros de búsqueda</p>
    </div>
  )
}

export default function DataTable<T extends Record<string, unknown> & { id: number | string }>({
  columns,
  data,
  pagination,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const { isMobile } = useViewport()
  const contentClass = pagination?.isLoading ? "opacity-50 pointer-events-none" : ""

  if (data.length === 0) return <EmptyState />

  /* ── Mobile: cards ── */
  if (isMobile) {
    return (
      <div className={contentClass}>
        <div className="flex flex-col gap-3 p-3">
          {data.map((informe) => {
            const titulo = String(informe['titulo'] ?? '')
            const descripcion = informe['descripcion'] ? String(informe['descripcion']) : null
            const filepath = String(informe['filepath'] ?? '')

            const metaColumns = columns.filter(
              (col) => col.key !== 'titulo' && col.key !== 'filepath' && col.key !== 'descripcion'
            )

            return (
              <article key={informe.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors duration-150">
                {/* Title + date row */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-semibold text-dark-blue text-sm leading-snug break-words">{titulo}</h2>
                  {!!informe['fecha'] && (
                    <span className="text-xs text-slate-400 whitespace-nowrap shrink-0">{String(informe['fecha'])}</span>
                  )}
                </div>

                {/* Description */}
                {descripcion && (
                  <p className="text-xs text-slate-500 mb-2">{descripcion}</p>
                )}

                {/* Meta chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {metaColumns.map((col) => {
                    const val = informe[col.key]
                    if (val === null || val === undefined || val === 0 || val === '') return null
                    return (
                      <span key={col.key} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 rounded-md px-2 py-0.5">
                        <span className="font-medium text-slate-400">{col.label}:</span>
                        {String(val)}
                      </span>
                    )
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-dark-blue hover:bg-light-blue rounded-lg py-2 transition-colors duration-150"
                  >
                    <IconOpen />
                    Abrir PDF
                  </a>
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(informe)}
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:bg-light-blue hover:text-white hover:border-light-blue transition-colors duration-150 cursor-pointer"
                      aria-label="Editar reporte"
                    >
                      <IconEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(informe)}
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors duration-150 cursor-pointer"
                      aria-label="Eliminar reporte"
                    >
                      <IconDelete />
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
        {pagination && <TablePaginationControls pagination={pagination} />}
      </div>
    )
  }

  /* ── Desktop: table ── */
  const dataColumns = columns.filter((col) => col.key !== 'filepath')

  return (
    <div className={contentClass}>
      <div className="w-full overflow-x-auto">
        <table className="min-w-[50rem] w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {dataColumns.map((col, idx) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap
                    ${idx === 0 ? 'sticky left-0 z-10 bg-slate-50 border-r border-slate-200' : ''}`}
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((informe) => (
              <tr key={informe.id} className="group hover:bg-slate-50 transition-colors duration-100">
                {dataColumns.map((col, idx) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-slate-700 align-top
                      ${idx === 0
                        ? 'sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-r border-slate-100 font-medium text-dark-blue'
                        : ''}
                    `}
                  >
                    <span className={`block ${col.key === 'titulo' || col.key === 'descripcion' ? 'whitespace-normal break-words min-w-[10rem]' : 'whitespace-nowrap'}`}>
                      {renderCell(informe[col.key])}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-3 align-middle">
                  <div className="flex items-center justify-center gap-1">
                    <a
                      href={String(informe['filepath'] ?? '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-light-blue hover:bg-blue-50 transition-colors duration-150"
                      aria-label="Abrir reporte"
                    >
                      <IconOpen />
                    </a>
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(informe)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-light-blue hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                        aria-label="Editar reporte"
                      >
                        <IconEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(informe)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-brand-red hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                        aria-label="Eliminar reporte"
                      >
                        <IconDelete />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && <TablePaginationControls pagination={pagination} />}
    </div>
  )
}
