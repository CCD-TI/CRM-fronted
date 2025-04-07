"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname?.split("/").filter((x) => x) || [];
  const [isClient, setIsClient] = useState(false);

  // Mapeo de nombres personalizados
  const nameMap: Record<string, string> = {
    pagesmeta: "Paginas",
    campaigns: "Campañas",
    form: "Formulario",
  };

  // Función para obtener el nombre mostrado
  const getDisplayName = (segment: string) => {
    return nameMap[segment] || segment;
  };

  useEffect(() => {
    // Esto asegura que el código solo se ejecute en el cliente
    setIsClient(true);
  }, []);

  const handleBackClick = () => {
    if (isClient) {
      window.history.back();
    }
  };

  return (
    <div className="my-4 flex items-center gap-2 text-sm">
      <button
        onClick={handleBackClick}
        className="flex items-center gap-1 rounded border border-gray-200 bg-white px-2 py-0.5 text-lg shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <MdOutlineKeyboardDoubleArrowLeft className="text-3xl" />
        Atrás
      </button>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(name);

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <span>/</span>
            <span className="rounded border border-gray-200 bg-white px-2 py-0.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              {displayName}
            </span>
          </div>
        );
      })}
    </div>
  );
}
