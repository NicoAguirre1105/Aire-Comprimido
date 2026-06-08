import Link from "next/link";
import { useViewport } from "@/app/_context/ViewportContext";
import Image from "next/image";

type Column = {
  key: string,
  label: string
}

type Filter = {
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
  filters?: Filter[];
  data: T[];
  pagination?: TablePagination;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function renderCell(val: unknown): React.ReactNode {
  if (val === null || val === undefined || val === 0 || val === '') return '—'
  return String(val)
}

function TablePaginationControls({ pagination }: { pagination: TablePagination }) {
  const { page, totalPages, totalCount, pageSize, onPageChange, isLoading } = pagination
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  return (
    <nav
      className="flex flex-col items-center gap-3 mt-6 sm:flex-row sm:justify-between"
      aria-label="Paginación de reportes"
    >
      <p className="text-sm text-(--dark-blue)/70">
        {totalCount === 0
          ? 'Sin reportes'
          : `Mostrando ${from}–${to} de ${totalCount}`}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isLoading}
          className="px-3 py-1 rounded-sm font-semibold bg-(--grey-blue) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--light-blue) hover:text-white transition-colors cursor-pointer"
        >
          Anterior
        </button>
        <span className="text-sm font-medium min-w-28 text-center">
          Página {page} de {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || isLoading}
          className="px-3 py-1 rounded-sm font-semibold bg-(--grey-blue) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--light-blue) hover:text-white transition-colors cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </nav>
  )
}

export default function DataTable<T extends Record<string, unknown> & { id: number | string }>({ columns, data, pagination, onEdit, onDelete }: DataTableProps<T>) {

  const { isMobile } = useViewport()
  const tdStyle = "py-3 px-2 text-center"

  const contentClass = pagination?.isLoading ? "opacity-50 pointer-events-none" : ""

  if (data.length === 0) return (
    <div className="w-full mt-10 flex flex-col items-center justify-center py-20 gap-3 text-(--dark-blue)/50 border-2 border-dashed border-(--dark-blue)/20 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-sm font-medium">No se encontraron reportes</p>
      <p className="text-xs opacity-70">Intenta ajustar los filtros de búsqueda</p>
    </div>
  )

  if (isMobile) return (
    <>
    <section className={`flex flex-col gap-5 my-7 items-center ${contentClass}`}>
      {data.map((informe) => (
        <article key={informe.id} className="flex flex-col bg-(--grey-blue) p-5 rounded-sm sm:px-10 w-full max-w-100">
          <h2 className="font-bold text-xl">{String(informe['titulo'] ?? '')}</h2>
          <p className="my-1 font-light">{String(informe['descripcion'] ?? '')}</p>
          {columns.flatMap((col) => {
            if (col.key !== 'titulo' && col.key !== 'filepath' && col.key !== 'descripcion') {
              if(informe[col.key] === 0 || informe[col.key] === null || informe[col.key] === "") return
              return (
              <div key={col.key} className="flex gap-2 pl-2">
                <h3 className="font-medium">{col.label}:</h3>
                <p className="font-light">{renderCell(informe[col.key])}</p>
              </div>
            )}
          })}
          <div className="flex gap-2 mt-4 w-full justify-center">
            <Link className="text-white bg-(--dark-blue) w-full py-1 font-semibold text-center transition-[scale] ease-in-out rounded-sm hover:scale-102 max-w-75" href={String(informe['filepath'] ?? '')} target="_blank">Abrir</Link>
            <button type="button" onClick={() => onEdit?.(informe)} className="bg-(--light-blue) px-1 transition-[scale] ease-in-out rounded-sm hover:scale-105 w-10">
              <Image
                src="/icons/edit_white.svg"
                alt="Editar reporte"
                width={150}
                height={150}
                className="cursor-pointer w-auto"
              />
            </button>
            <button type="button" onClick={() => onDelete?.(informe)} className="bg-(--red) px-1 transition-[scale] ease-in-out rounded-sm hover:scale-105 w-10">
              <Image
                src="/icons/delete_white.svg"
                alt="Eliminar reporte"
                width={150}
                height={150}
                className="cursor-pointer w-auto"
              />
            </button>
          </div>
        </article>
      ))}
    </section>
    {pagination && <TablePaginationControls pagination={pagination} />}
    </>
  )

  return (
    <>
    <div className={`w-full mt-10 rounded-lg border-3 border-(--dark-blue) overflow-hidden ${contentClass}`}>
      <div className="w-full overflow-x-auto relative">
        <table className="min-w-200 w-full">
          <thead className="bg-(--grey-blue)">
            <tr>
              {columns.map((col, idx) => (
                <th
                  className={`px-4 py-3 ${idx == 0 ? "sticky left-0 z-10 max-w-40 border-r-3 bg-(--grey-blue)" : ""}`}
                  key={col.key}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map(informe => (
              <tr key={informe.id} className="border-b-3">
                {columns.flatMap((col, idx) => {
                  if (col.key !== 'filepath') {
                    return (
                      <td
                        className={`${tdStyle} ${idx == 0 ? "sticky left-0 z-10 bg-white max-w-40 border-r-3" : ""}`}
                        key={col.key}
                      >
                        {renderCell(informe[col.key])}
                      </td>
                    )
                  }
                })}
                <td className={`${tdStyle}`}>
                  <div className="flex justify-center">
                    <Link
                    href={String(informe['filepath'] ?? '')}
                    target="_blank">
                      <Image
                        src="/icons/open_link_blue.svg"
                        alt="Abrir reporte"
                        width={150}
                        height={150}
                        className="hover:scale-110 cursor-pointer w-auto mx-auto"
                      />
                    </Link>
                    <button type="button" onClick={() => onEdit?.(informe)} className="cursor-pointer">
                      <Image
                        src="/icons/edit.svg"
                        alt="Editar reporte"
                        width={150}
                        height={150}
                        className="hover:scale-110 w-auto mx-auto"
                      />
                    </button>
                    <button type="button" onClick={() => onDelete?.(informe)} className="cursor-pointer">
                      <Image
                        src="/icons/delete.svg"
                        alt="Eliminar reporte"
                        width={150}
                        height={150}
                        className="hover:scale-105 w-auto mx-auto"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {pagination && <TablePaginationControls pagination={pagination} />}
    </>
  );
}
