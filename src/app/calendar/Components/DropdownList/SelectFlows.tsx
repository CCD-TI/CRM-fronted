import { useState, useEffect } from 'react';

// Definir interfaces para TypeScript
interface Mensaje {
  id: string;
  tipo: string;
  content: {
    body: string;
    footer: string;
  };
}

interface Flow {
  id: number;
  name: string;
  mensajes: Mensaje[];
}

interface ApiResponse {
  flows: Flow[];
  cadic:string
}

const DropdownBuscador = () => {
  const [opciones, setOpciones] = useState<Flow[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>('');
  const [abierto, setAbierto] = useState<boolean>(false);
  const [seleccionado, setSeleccionado] = useState<Flow | null>(null);

  // Función para obtener datos de la API
  const obtenerDatos = async (terminoBusqueda = '') => {
    try {
      setCargando(true);
      const respuesta = await fetch(`http://192.168.1.182:8000/api/flows/search?masivos=false`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: terminoBusqueda }),
      });
      
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta de la red');
      }
      
      const datos: ApiResponse = await respuesta.json();
      setOpciones(datos.flows || []);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setOpciones([]);
    } finally {
      setCargando(false);
    }
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    obtenerDatos();
  }, []);

  // Manejar cambio en la entrada de búsqueda
  const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    obtenerDatos(valor);
  };

  // Manejar selección de opción
  const manejarSeleccion = (opcion: Flow) => {
    setSeleccionado(opcion);
    setAbierto(false);
    setBusqueda(opcion.name);
  };

  return (
    <div className="relative w-full ">
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Buscar flow..."
          value={busqueda}
          onChange={manejarCambioBusqueda}
          onClick={() => setAbierto(true)}
        />
        <button
          className="absolute right-2 top-2"
          onClick={() => setAbierto(!abierto)}
          type="button"
        >
          ▼
        </button>
      </div>
      
      {abierto && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto z-10">
          {cargando ? (
            <div className="p-2 text-center">Cargando...</div>
          ) : opciones.length > 0 ? (
            opciones.map((opcion) => (
              <div
                key={opcion.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => manejarSeleccion(opcion)}
              >
                {opcion.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-center">No se encontraron resultados</div>
          )}
        </div>
      )}
      
      {seleccionado && (
        <div className="mt-2">
          Flow seleccionado: <strong>{seleccionado.name}</strong> (ID: {seleccionado.id})
          {/* <div className="mt-1 text-sm text-gray-600">
            Mensajes: {seleccionado.mensajes.length}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DropdownBuscador;