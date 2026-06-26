const year = new Date().getFullYear();

export const Footer = () => (
  <footer className="bg-blue-900 text-gray-300 px-6 py-6 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <div className="text-center md:text-left">
        <p className="text-white font-medium">Sistema Integrado de Gestión Aduanera (SIGA)</p>
        <p className="text-gray-400 text-xs">Servicio Nacional de Aduanas, Gobierno de Chile</p>
        <p className="text-gray-500 text-xs mt-1">&copy; {year} SIGA. Todos los derechos reservados.</p>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <a href="#" className="hover:text-white transition-colors">Mesa de Ayuda</a>
        <span className="text-gray-600">|</span>
        <a href="#" className="hover:text-white transition-colors">Manual de Operaciones</a>
        <span className="text-gray-600">|</span>
        <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
      </div>

      <div className="text-right">
        <p className="text-gray-500 text-xs">v1.0.0-rc1</p>
      </div>
    </div>
  </footer>
);
