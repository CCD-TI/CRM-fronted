import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { SearchCurso } from "@/services/Cursos-Api/PushAPI";
import { ICurso } from "@/types/apiResponseCurso";

interface DropDownCursosProps {
  idCursoInicial?: number | null; // Solo recibe el ID
  onCursoSeleccionado:(curso: ICurso | null) => void; // Devuelve el objeto completo o null
  placeholder?: string;
}

const DropdownCursos = ({ 
  idCursoInicial = null, 
  onCursoSeleccionado, 
  placeholder = "Buscar curso..." 
}: DropDownCursosProps) => {
  const [opciones, setOpciones] = useState<ICurso[]>([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [cursoActual, setCursoActual] = useState<ICurso | null>(null);

  // Buscar cursos en la API
  const buscarCursos = async (termino: string = "") => {
    try {
      setCargando(true);
      const resultados = await SearchCurso.Search(termino);
      setOpciones(resultados);
      
      // Si hay ID inicial pero no tenemos el curso, lo buscamos
      if (idCursoInicial && !cursoActual) {
        const cursoPreseleccionado = resultados.find(c => c.id === idCursoInicial);
        if (cursoPreseleccionado) {
          setCursoActual(cursoPreseleccionado);
          setBusqueda(cursoPreseleccionado.nombre || cursoPreseleccionado.nomenclatura || "");
        }
      }
    } catch (error) {
      console.error("Error buscando cursos:", error);
      setOpciones([]);
    } finally {
      setCargando(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    buscarCursos();
  }, );

  // Sincronizar cuando cambia el ID inicial
  useEffect(() => {
    if (!idCursoInicial) {
      setCursoActual(null);
      setBusqueda("");
      return;
    }

    const cursoExistente = opciones.find(c => c.id === idCursoInicial);
    if (cursoExistente) {
      setCursoActual(cursoExistente);
      setBusqueda(cursoExistente.nombre || cursoExistente.nomenclatura || "");
    }
  }, [idCursoInicial, opciones]);

  // Manejar selección de curso
  const seleccionarCurso = (curso: ICurso) => {
    setCursoActual(curso);
    onCursoSeleccionado(curso); // Envía el objeto completo al padre
    setBusqueda(curso.nombre || curso.nomenclatura || "");
    setAbierto(false);
  };

  // Limpiar selección
  const limpiarSeleccion = () => {
    setCursoActual(null);
    setBusqueda("");
    onCursoSeleccionado(null); // Notifica al padre que no hay curso seleccionado
    setAbierto(false);
  };

  // Manejar búsqueda
  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termino = e.target.value;
    setBusqueda(termino);
    
    if (termino === "" && cursoActual) {
      limpiarSeleccion();
    } else {
      buscarCursos(termino);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-xl border p-2"
          placeholder={placeholder}
          value={busqueda}
          onChange={handleBusqueda}
          onClick={() => !cursoActual && setAbierto(true)}
          readOnly={!!cursoActual}
        />
        
        <button
          className="absolute right-2 top-2"
          onClick={cursoActual ? limpiarSeleccion : () => setAbierto(!abierto)}
          type="button"
        >
          {cursoActual ? (
            <IoCloseCircleOutline className="text-xl text-red-600" />
          ) : abierto ? (
            <IoCloseCircleOutline className="text-xl text-red-600" />
          ) : (
            <TiArrowSortedDown className="text-xl" />
          )}
        </button>
      </div>

      {abierto && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg">
          {cargando ? (
            <div className="p-2 text-center">Cargando...</div>
          ) : opciones.length > 0 ? (
            opciones.map((curso) => (
              <div
                key={curso.id}
                className={`flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100 ${
                  cursoActual?.id === curso.id ? "bg-blue-100" : ""
                }`}
                onClick={() => seleccionarCurso(curso)}
              >
                <span>{curso.nombre || curso.nomenclatura}</span>
                {cursoActual?.id === curso.id && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            ))
          ) : (
            <div className="p-2 text-center">No se encontraron cursos</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownCursos;