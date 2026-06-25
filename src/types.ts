export type UserRole = 'funcionario' | 'administrador'

export type ModuleId =
  | 'inicio'
  | 'aduana'
  | 'sag'
  | 'autoatencion'
  | 'reportes'
  | 'auditoria'
  | 'evolucion'
  | 'ayuda'

export type User = {
  id: string
  rut: string
  nombre: string
  role: UserRole
  organismo: 'Aduanas' | 'PDI' | 'SAG' | 'Administración'
}

export type MockUser = User & {
  password: string
}

export type VehicleType = 'particular' | 'diplomatico'
export type ProcessStatus = 'aprobado' | 'observado' | 'rechazado'

export type VehicleRecord = {
  id: string
  patente: string
  propietario: string
  documento: string
  nacionalidad: string
  tipo: VehicleType
  fechaIngreso: string
  fechaLimite: string
  diasAutorizados: number
  estado: ProcessStatus
  observacion: string
  funcionario: string
  creadoEn: string
}

export type SagDeclaration = {
  id: string
  pasajero: string
  documento: string
  declaraAlimentos: boolean
  declaraAnimales: boolean
  detalle: string
  estado: ProcessStatus
  funcionario: string
  creadoEn: string
}

export type PassengerRecord = {
  id: string
  nombre: string
  documento: string
  nacionalidad: string
  esMenor: boolean
  autorizacionMenor: boolean
  codigoAtencion: string
  estado: ProcessStatus
  creadoEn: string
}

export type AuditEntry = {
  id: string
  fecha: string
  usuario: string
  organismo: string
  accion: string
  modulo: string
  resultado: 'Exitoso' | 'Observado' | 'Fallido'
}

export type AppData = {
  vehicles: VehicleRecord[]
  declarations: SagDeclaration[]
  passengers: PassengerRecord[]
  audit: AuditEntry[]
}

export type AuditInput = Omit<AuditEntry, 'id' | 'fecha' | 'usuario' | 'organismo'>
