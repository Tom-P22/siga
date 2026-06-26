import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const RevisionAutoatencionView = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-white hover:text-blue-200 mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">SIGA</h1>
          <span className="hidden md:inline-block text-sm text-blue-200">| Revisión de Autoatención</span>
        </div>
        <div className="text-sm text-blue-200">Funcionario: Alan Brito</div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Revisión de Autoatención</h2>
          <p className="text-gray-600">Seleccione una opción para revisar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow border-t-4 border-t-teal-700 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Datos Autodeclarados</h3>
            </div>
            <p className="text-base text-gray-600 mb-6 flex-grow">
              Revise y valide los datos ingresados por los pasajeros a través de los tótems de autoatención.
            </p>
            <button
              onClick={() => navigate('/datos-autodeclarados')}
              className="w-full py-4 bg-teal-700 text-white rounded-lg hover:bg-teal-800 font-semibold text-lg transition-colors"
            >
              Revisar Datos
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow border-t-4 border-t-teal-700 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Tótems de Autoatención</h3>
            </div>
            <p className="text-base text-gray-600 mb-6 flex-grow">
              Administre la configuración y el estado de los tótems de autoatención dispuestos en el paso fronterizo.
            </p>
            <button
              onClick={() => navigate('/totems')}
              className="w-full py-4 bg-teal-700 text-white rounded-lg hover:bg-teal-800 font-semibold text-lg transition-colors"
            >
              Revisar Tótems
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
