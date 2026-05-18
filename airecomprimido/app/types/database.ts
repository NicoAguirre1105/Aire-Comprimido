export type Informe = {
  id: number
  created_at: string
  titulo: string
  fecha: string
  descripcion: string
  empresa: string
  area: string
  equipo_id: number
  equipo: string
  conteo_horas: number
  filepath: string
}

export type Empresa = {
  id: number
  created_at: string
  empresa: string
  public_uuid: string
}

export type Equipo = {
  id: number
  created_at: string
  equipo: string
  modelo: string
  empresa: string
  area: string
  public_uuid: string
}

export type Area = {
  id: number
  created_at: string
  area: string
  empresa: string
  public_uuid: string
}
