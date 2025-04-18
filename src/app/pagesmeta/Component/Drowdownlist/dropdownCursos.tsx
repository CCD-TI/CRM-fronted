// import { useState, useEffect } from "react";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { Bots , IBot } from "@/types/flows";
// import { searchBots } from "@/services/Cursos-Api/Dropdoplist.services";


// interface DropDownListSend {
//   botSeleccionados?: IBot[]; // Bots seleccionados enviados desde el padre
//   onSeleccionBots: (bots: IBot[]) => void; // Función para actualizar bots en el padre
// }


// const DropdownBuscador = ({ onSeleccionBots , botSeleccionados= [] }: DropDownListSend) => {
//   const [opciones, setOpciones] = useState<Bots[]>([]);
//   const [cargando, setCargando] = useState<boolean>(false);
//   const [busqueda, setBusqueda] = useState<string>("");
//   const [abierto, setAbierto] = useState<boolean>(false);
//   const [seleccionados, setSeleccionados] = useState(botSeleccionados || []); // Inicializa con los bots seleccionados enviados desde el padre

//   // Función para obtener datos de la API
//   const obtenerDatos = async (terminoBusqueda = "") => {
//     try {
//       setCargando(true);
//       const bots = await searchBots(terminoBusqueda);
//       setOpciones(bots);
//     } catch (error) {
//       console.error("Error al obtener datos:", error);
//       setOpciones([]);
//     } finally {
//       setCargando(false);
//     }
//   };


  
//   // Carga inicial al montar el componente
//   useEffect(() => {
//     obtenerDatos();
//   }, []);

//   // Actualizar la lista de seleccionados en el padre cuando cambie
//   useEffect(() => {
//     onSeleccionBots(seleccionados);
    
//     // console.log("Bots en el select", seleccionados); // Verifica los bots seleccionados
//   }, [seleccionados, onSeleccionBots]);

//   // Manejar cambio en la entrada de búsqueda
//   const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const valor = e.target.value;
//     setBusqueda(valor);
//     obtenerDatos(valor);
//   };

//   // Manejar selección de opción
//   const manejarSeleccion = (opcion: Bots) => {
//     setSeleccionados((prev) => {
//       const yaSeleccionado = prev.some((item) => item.id === opcion.id);

//       if (yaSeleccionado) {
//         return prev.filter((item) => item.id !== opcion.id);
//       } else {
//         return [...prev, opcion];
//       }
//     });
//   };

//   // Verificar si un elemento está seleccionado
//   const estaSeleccionado = (id: number): boolean => {
//     return seleccionados.some((item) => item.id === id);
//   };

//   // Eliminar un elemento seleccionado
//   const eliminarSeleccionado = (id: number) => {
//     setSeleccionados((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="relative w-full">
//       <div className="relative">
//         <input
//           type="text"
//           className="w-full rounded border p-2"
//           placeholder="Buscar Bot..."
//           value={busqueda}
//           onChange={manejarCambioBusqueda}
//           onClick={() => setAbierto(true)}
//         />
//         <button
//           className="absolute right-2 top-2"
//           onClick={() => setAbierto(!abierto)}
//           type="button"
//         >
//           {abierto ? (
//             <IoCloseCircleOutline className="text-3xl text-red-600" />
//           ) : (
//             <TiArrowSortedDown className="text-3xl" />
//           )}
//         </button>
//       </div>

//       {abierto && (
//         <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow-lg">
//           {cargando ? (
//             <div className="p-2 text-center">Cargando...</div>
//           ) : opciones.length > 0 ? (
//             opciones.map((opcion) => (
//               <div
//                 key={opcion.id}
//                 className={`flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100 ${
//                   estaSeleccionado(opcion.id) ? "bg-blue-100" : ""
//                 }`}
//                 onClick={() => manejarSeleccion(opcion)}
//               >
//                 <span>{opcion.name}</span>
//                 {estaSeleccionado(opcion.id) && (
//                   <span className="text-blue-600">✓</span>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="p-2 text-center">No se encontraron resultados</div>
//           )}
//         </div>
//       )}

//       {seleccionados.length > 0 && (
//         <div className="mt-2">
//           <div className="mb-1 font-medium">Bots seleccionados:</div>
//           <div className="flex flex-wrap gap-2">
//             {seleccionados.map((bot,index) => (
//               <div
//                 key={bot.id || `bot-${index}`}
//                 className="flex items-center rounded bg-blue-100 px-2 py-1 text-blue-800"
//               >
//                 <span>{bot.name || bot.botNombre}</span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     eliminarSeleccionado(bot.id);
//                   }}
//                   className="ml-2 text-blue-600 hover:text-blue-800"
//                   type="button"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownBuscador;
import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { Bots, IBot } from "@/types/flows";
import { searchBots } from "@/services/Cursos-Api/Dropdoplist.services";
import { ICurso } from "@/types/apiResponseCurso";
import { ViewCourse } from "@/services/Leads-api/Form";
import { SearchCurso } from "@/services/Cursos-Api/PushAPI";

interface DropDownListSend {
  cursoSeleccionado?: ICurso[]; // Bots seleccionados enviados desde el padre
  onSeleccionBots: (curso: ICurso) => void; // Función para actualizar bots en el padre
}

const DropdownBuscador = ({ onSeleccionBots, cursoSeleccionado = [] }: DropDownListSend) => {
  const [opciones, setOpciones] = useState<ICurso[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>("");
  const [abierto, setAbierto] = useState<boolean>(false);
  const [seleccionados, setSeleccionados] = useState<ICurso[]>(cursoSeleccionado || []); // Inicializa con los bots seleccionados enviados desde el padre

  // Función para obtener datos de la API
  const obtenerDatos = async (terminoBusqueda = "") => {
    try {
      setCargando(true);
      const cursos = await SearchCurso.Search(terminoBusqueda);
      setOpciones(cursos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setOpciones([]);
    } finally {
      setCargando(false);
    }
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    obtenerDatos();
  }, []);

  // Actualizar la lista de seleccionados en el padre cuando cambie
  useEffect(() => {
      if (seleccionados.length === 1) {
        onSeleccionBots(seleccionados[0]); // Pass the first selected course
      }
    }, [seleccionados, onSeleccionBots]);

  // Mostrar el nombre del bot seleccionado en el input
  useEffect(() => {
    if (seleccionados.length === 1) {
      setBusqueda(seleccionados[0].nombre || seleccionados[0].nomenclatura || "");
    } else {
      setBusqueda("");
    }
  }, [seleccionados]);

  // Manejar cambio en la entrada de búsqueda
  const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    
    // Si borramos el input, quitamos el bot seleccionado
    if (valor === "" && seleccionados.length > 0) {
      setSeleccionados([]);
    } else {
      obtenerDatos(valor);
    }
  };

  // Manejar selección de opción - ahora solo permite un bot seleccionado
  const manejarSeleccion = (opcion: ICurso) => {
    setSeleccionados([opcion]); // Reemplaza la selección anterior con el nuevo bot
    setAbierto(false); // Cierra el dropdown después de seleccionar
  };

  // Verificar si un elemento está seleccionado
  const estaSeleccionado = (id: number): boolean => {
    return seleccionados.some((item) => item.id === id);
  };

  // Limpiar la selección
  const limpiarSeleccion = () => {
    setSeleccionados([]);
    setBusqueda("");
    setAbierto(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-xl border p-2"
          placeholder="Buscar Cursos..."
          value={busqueda}
          onChange={manejarCambioBusqueda}
          onClick={() => {
            // Si hay un bot seleccionado y hacemos clic, no abrimos el dropdown
            if (seleccionados.length === 0) {
              setAbierto(true);
            }
          }}
          readOnly={seleccionados.length > 0} // Si hay seleccionado, el input es de solo lectura
        />
        <button
          className="absolute right-2 top-2"
          onClick={() => {
            if (seleccionados.length > 0) {
              limpiarSeleccion(); // Si hay selección, al hacer clic limpiamos
            } else {
              setAbierto(!abierto); // Si no hay selección, abrimos/cerramos dropdown
            }
          }}
          type="button"
        >
          {seleccionados.length > 0 ? (
            <IoCloseCircleOutline className="text-3xl text-red-600" />
          ) : abierto ? (
            <IoCloseCircleOutline className="text-3xl text-red-600" />
          ) : (
            <TiArrowSortedDown className="text-3xl" />
          )}
        </button>
      </div>

      {abierto && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg">
          {cargando ? (
            <div className="p-2 text-center">Cargando...</div>
          ) : opciones.length > 0 ? (
            opciones.map((opcion) => (
              <div
                key={opcion.id}
                className={`flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100 ${
                  estaSeleccionado(opcion.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => manejarSeleccion(opcion)}
              >
                <span>{opcion.nombre}</span>
                {estaSeleccionado(opcion.id) && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            ))
          ) : (
            <div className="p-2 text-center">No se encontraron resultados</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownBuscador;