import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { searchBots } from "@/services/Cursos-Api/Dropdoplist.services";
import { IBot } from "@/types/flows";

interface DropdownBotProps {
  botIdInicial?: number | null; // Solo recibe el ID del bot
  onBotSeleccionado: (bot: IBot | null) => void; // Devuelve el objeto completo o null
  placeholder?: string;
}

const DropdownBot = ({ 
  botIdInicial = null, 
  onBotSeleccionado, 
  placeholder = "Buscar bot..." 
}: DropdownBotProps) => {
  const [opciones, setOpciones] = useState<IBot[]>([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [botSeleccionado, setBotSeleccionado] = useState<IBot | null>(null);

  // Buscar bots en la API
  const buscarBots = async (termino: string = "") => {
    try {
      setCargando(true);
      const resultados = await searchBots(termino);
      setOpciones(resultados);
      
      // Si hay ID inicial pero no tenemos el bot, lo buscamos
      if (botIdInicial && !botSeleccionado) {
        const botPreseleccionado = resultados.find(b => b.id === botIdInicial);
        if (botPreseleccionado) {
          setBotSeleccionado(botPreseleccionado);
          setBusqueda(botPreseleccionado.name || botPreseleccionado.botNombre || "");
        }
      }
    } catch (error) {
      console.error("Error buscando bots:", error);
      setOpciones([]);
    } finally {
      setCargando(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    buscarBots();
  }, );

  // Sincronizar cuando cambia el ID inicial
  useEffect(() => {
    if (!botIdInicial) {
      setBotSeleccionado(null);
      setBusqueda("");
      return;
    }

    const botExistente = opciones.find(b => b.id === botIdInicial);
    if (botExistente) {
      setBotSeleccionado(botExistente);
      setBusqueda(botExistente.name || botExistente.botNombre || "");
    }
  }, [botIdInicial, opciones]);

  // Manejar selección de bot
  const seleccionarBot = (bot: IBot) => {
    setBotSeleccionado(bot);
    onBotSeleccionado(bot); // Envía el objeto completo al padre
    setBusqueda(bot.name || bot.botNombre || "");
    setAbierto(false);
  };

  // Limpiar selección
  const limpiarSeleccion = () => {
    setBotSeleccionado(null);
    setBusqueda("");
    onBotSeleccionado(null); // Notifica al padre
    setAbierto(false);
  };

  // Manejar búsqueda
  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termino = e.target.value;
    setBusqueda(termino);
    
    if (termino === "" && botSeleccionado) {
      limpiarSeleccion();
    } else {
      buscarBots(termino);
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
          onClick={() => !botSeleccionado && setAbierto(true)}
          readOnly={!!botSeleccionado}
        />
        
        <button
          className="absolute right-2 top-2"
          onClick={botSeleccionado ? limpiarSeleccion : () => setAbierto(!abierto)}
          type="button"
        >
          {botSeleccionado ? (
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
            opciones.map((bot) => (
              <div
                key={bot.id}
                className={`flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100 ${
                  botSeleccionado?.id === bot.id ? "bg-blue-100" : ""
                }`}
                onClick={() => seleccionarBot(bot)}
              >
                <span>{bot.name || bot.botNombre}</span>
                {botSeleccionado?.id === bot.id && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            ))
          ) : (
            <div className="p-2 text-center">No se encontraron bots</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownBot;