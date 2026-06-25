import { PageHeader } from '../components/PageHeader'

export const HelpView: React.FC = () => (
  <>
    <PageHeader
      eyebrow="RF09 · Asistencia integrada"
      title="Ayuda y recorrido de demostración"
      description="Guía breve para presentar el prototipo y recorrer sus funcionalidades principales sin perder el hilo de la exposición."
    />
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Recorrido recomendado</h3>
        <ol className="mt-4 space-y-4">
          {[
            'Inicie sesión como funcionario y muestre el dashboard.',
            'En Aduana, simule QR y LPR; cambie entre vehículo particular y diplomático.',
            'Emita el permiso y abra la impresión con dos copias.',
            'Registre una declaración SAG con alimentos para demostrar la derivación.',
            'Genere un ticket de autoatención para un menor con y sin autorización.',
            'Exporte el CSV y luego ingrese como administrador para revisar la auditoría.',
          ].map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-100 font-black text-aduana">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </article>
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Alcance del prototipo</h3>
        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
          <p><strong className="text-slate-800">Datos simulados:</strong> no existe backend real; las integraciones con PDI, SAG y Aduana Argentina se representan mediante reglas de negocio y respuestas controladas.</p>
          <p><strong className="text-slate-800">Persistencia:</strong> los registros permanecen en localStorage para demostrar continuidad entre sesiones.</p>
          <p><strong className="text-slate-800">Seguridad:</strong> las credenciales son de demostración y los perfiles restringen la auditoría al administrador.</p>
          <p><strong className="text-slate-800">Calidad:</strong> la solución aplica características ISO 9126/25010 observables: funcionalidad, usabilidad, fiabilidad, eficiencia, mantenibilidad y portabilidad.</p>
        </div>
      </article>
    </div>
  </>
)
