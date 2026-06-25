import type { AppData, MockUser } from './types'

export const mockUsers: MockUser[] = [
  {
    id: 'USR-001',
    rut: '12.345.678-5',
    password: 'aduana123',
    nombre: 'Camila Rojas',
    role: 'funcionario',
    organismo: 'Aduanas',
  },
  {
    id: 'USR-002',
    rut: '11.111.111-1',
    password: 'admin123',
    nombre: 'Martín Silva',
    role: 'administrador',
    organismo: 'Administración',
  },
]

export const initialData: AppData = {
  vehicles: [
    {
      id: 'VEH-2026-001',
      patente: 'ABCD12',
      propietario: 'Lucía Fernández',
      documento: 'AR-32458961',
      nacionalidad: 'Argentina',
      tipo: 'particular',
      fechaIngreso: '2026-06-20',
      fechaLimite: '2026-12-17',
      diasAutorizados: 180,
      estado: 'aprobado',
      observacion: 'Documentación validada con Aduana Argentina.',
      funcionario: 'Camila Rojas',
      creadoEn: '2026-06-20T10:12:00-04:00',
    },
  ],
  declarations: [
    {
      id: 'SAG-2026-001',
      pasajero: 'Diego Morales',
      documento: '18.456.321-7',
      declaraAlimentos: true,
      declaraAnimales: false,
      detalle: 'Dos paquetes sellados de yerba mate.',
      estado: 'observado',
      funcionario: 'Camila Rojas',
      creadoEn: '2026-06-24T09:35:00-04:00',
    },
  ],
  passengers: [
    {
      id: 'PAS-2026-001',
      nombre: 'Sofía Gómez',
      documento: 'AR-45123987',
      nacionalidad: 'Argentina',
      esMenor: false,
      autorizacionMenor: false,
      codigoAtencion: 'A-104',
      estado: 'aprobado',
      creadoEn: '2026-06-24T08:15:00-04:00',
    },
  ],
  audit: [
    {
      id: 'AUD-001',
      fecha: '2026-06-24T09:35:00-04:00',
      usuario: 'Camila Rojas',
      organismo: 'Aduanas',
      accion: 'Declaración SAG derivada a inspección',
      modulo: 'Control SAG',
      resultado: 'Observado',
    },
    {
      id: 'AUD-002',
      fecha: '2026-06-20T10:12:00-04:00',
      usuario: 'Camila Rojas',
      organismo: 'Aduanas',
      accion: 'Admisión temporal VEH-2026-001 aprobada',
      modulo: 'Control de Aduana',
      resultado: 'Exitoso',
    },
  ],
}

export const iterationHistory = [
  {
    version: 'v0.1',
    title: 'MVP de acceso',
    focus: 'Login, sesión simulada y panel inicial.',
    evidence: 'Primer flujo navegable con usuarios mock.',
  },
  {
    version: 'v0.2',
    title: 'Base institucional',
    focus: 'Tailwind v4, diseño responsive, roles y navegación.',
    evidence: 'Interfaz adaptada a escritorio, tablet y tótem.',
  },
  {
    version: 'v0.3',
    title: 'Control vehicular',
    focus: 'QR, LPR, formulario y reglas de 180/90 días.',
    evidence: 'Permiso temporal e impresión física duplicada.',
  },
  {
    version: 'v0.4',
    title: 'SAG y autoatención',
    focus: 'Declaración jurada, menores y ticket de atención.',
    evidence: 'Validaciones y derivación de casos observados.',
  },
  {
    version: 'v0.5',
    title: 'Trazabilidad',
    focus: 'localStorage, auditoría, dashboard y exportación CSV.',
    evidence: 'Persistencia y registro de acciones críticas.',
  },
  {
    version: 'v1.0',
    title: 'Prototipo funcional',
    focus: 'Accesibilidad, ayuda, pruebas y estabilización.',
    evidence: 'Build limpio y recorridos integrados de demostración.',
  },
]
