import { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { TiArrowSortedDown } from 'react-icons/ti';

// Definir interfaces para TypeScript


interface Bots {
  id: number;
  name: string;
}

interface ApiResponse {
  bots: Bots[];
}

const DropdownBuscador = () => {
  const [opciones, setOpciones] = useState<Bots[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>('');
  const [abierto, setAbierto] = useState<boolean>(false);
  const [seleccionados, setSeleccionados] = useState<Bots[]>([]);

  // Función para obtener datos de la API
  const obtenerDatos = async (terminoBusqueda = '') => {
    try {
      setCargando(true);
      const respuesta = await fetch(`http://192.168.1.182:8000/api/bots/search?imagebot=bot`, {
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
      setOpciones(datos.bots || []);
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
  const manejarSeleccion = (opcion: Bots) => {
    // Comprobar si el bot ya está seleccionado
    const yaSeleccionado = seleccionados.some(item => item.id === opcion.id);
    
    if (yaSeleccionado) {
      // Si ya está seleccionado, lo quitamos de la lista
      setSeleccionados(seleccionados.filter(item => item.id !== opcion.id));
    } else {
      // Si no está seleccionado, lo añadimos a la lista
      setSeleccionados([...seleccionados, opcion]);
    }
    
    // No cerramos el dropdown y mantenemos el texto de búsqueda
  };

  // Verificar si un elemento está seleccionado
  const estaSeleccionado = (id: number): boolean => {
    return seleccionados.some(item => item.id === id);
  };

  // Eliminar un elemento seleccionado
  const eliminarSeleccionado = (id: number) => {
    setSeleccionados(seleccionados.filter(item => item.id !== id));
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Buscar Bot..."
          value={busqueda}
          onChange={manejarCambioBusqueda}
          onClick={() => setAbierto(true)}
        />
        <button
          className="absolute right-2 top-2"
          onClick={() => setAbierto(!abierto)}
          type="button"
        >
       {abierto ?  <IoCloseCircleOutline className='text-3xl text-red-600 '/>  :<TiArrowSortedDown className='text-3xl' /> }
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
                className={`p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${estaSeleccionado(opcion.id) ? 'bg-blue-100' : ''}`}
                onClick={() => manejarSeleccion(opcion)}
              >
                <span>{opcion.name}</span>
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
      
      {seleccionados.length > 0 && (
        <div className="mt-2">
          <div className="font-medium mb-1">Bots seleccionados:</div>
          <div className="flex flex-wrap gap-2">
            {seleccionados.map(bot => (
              <div key={bot.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                <span>{bot.name}</span>
                <button 
                  onClick={() => eliminarSeleccionado(bot.id)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownBuscador;