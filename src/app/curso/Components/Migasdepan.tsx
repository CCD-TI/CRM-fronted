'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname?.split('/').filter(x => x) || [];

  // Mapeo de nombres personalizados
  const nameMap: Record<string, string> = {
    'pagesmeta': 'Paginas',
    'campaigns': 'Campañas',
    'form': 'Formulario',
  };

  // Función para obtener el nombre mostrado
  const getDisplayName = (segment: string) => {
    return nameMap[segment] || segment;
  };

  return (
    <div className="flex items-center gap-2 text-sm my-4">
      <button
        onClick={() => window.history.back()} // 👈 Regresar a la página anterior sin modificar la URL
        className="px-2 py-0.5 border rounded border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 text-lg flex items-center gap-1"
      >
       <MdOutlineKeyboardDoubleArrowLeft className='text-3xl' />
       Atrás
      </button>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(name);

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <span>/</span>
            <span className="px-2 py-0.5 border rounded border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              {displayName}
            </span>
          </div>
        );
      })}
    </div>
  );
}
