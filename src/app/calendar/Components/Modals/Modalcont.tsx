import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Image,
  FileVideo,
  FileAudio,
  File,
  Upload,
  X,
  Plus,
} from "lucide-react";

import SelectFlows from "../DropdownList/SelectFlows";
import SelectBots from "../DropdownList/SelectBots";
import SelectTemplates from "../DropdownList/SelectTemplates";
import { Flow } from "@/types/flows";
import { Bots } from "@/types/flows";
import { BotService, CursoService } from "@/services/Cursos-Api/PushAPI";
import { ICurso } from '@/types/apiResponseCurso';



interface DataCurso {
  Data: [];
  btn: ReactNode;
}

export default function App({ Data, btn }: DataCurso) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [activeView, setActiveView] = useState<"course" | "platform" | "view">(
    "course",
  );

  const [flowSeleccionado, setFlowSeleccionado] = useState<Flow | null>(null);
  const [botSeleccionado, setbotSeleccionado] = useState<Bots[] | null>(null);
  const [templateSeleccionado, settemplateSeleccionado] = useState<Flow | null>(
    null,
  );
  
  const [curso, setCurso] = useState<ICurso | null>(null);
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validaciones iniciales
    if (!flowSeleccionado) {
      alert("Por favor selecciona un flow");
      return;
    }
  
    if (!botSeleccionado || botSeleccionado.length === 0) {
      alert("Por favor selecciona al menos un bot");
      return;
    }
  
    try {
      // 1. Crear el curso primero
      const datosCurso = {
        cursoCCDId: 1,
        nombre: "CUR001", // ¿tiene que ser dinamico ser dinámico?
        flowId: flowSeleccionado.id,
        flowNombre: flowSeleccionado.name,
        templateNombre: flowSeleccionado.name,
      };
  
      const cursoCreado = await CursoService.createCurso(datosCurso);
      setCurso(cursoCreado);
      // console.log('Curso creado:', cursoCreado);
  
      // 2. Crear las relaciones con bots
      const botData = {
        cursoId: cursoCreado.id, // Usamos el ID del curso recién creado
        botsId: botSeleccionado.map(bot => bot.id),
        botsNombre: botSeleccionado.map(bot => bot.name),
      };
  
      const botsCreados = await BotService.createCurso(botData);
      // console.log('Relaciones bot-curso creadas:', botsCreados);
  
      // 3. Feedback al usuario
      alert("Datos enviados correctamente");
      
      // Opcional: Resetear estados
      // setFlowSeleccionado(null);
      // setBotSeleccionado([]);
  
    } catch (error) {
      console.error("Error:", error);
      
      let errorMessage = "Error al enviar los datos";
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage += `: ${error}`;
      }
  
      alert(errorMessage);
      
      // Opcional: Rollback o limpieza si falla la segunda operación
      if (curso) {
        // Podrías llamar a un servicio para eliminar el curso creado
        // await CursoService.deleteCurso(curso.id);
      }
    }
  };

  // Track which modal is open
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Refs for modal click outside detection
  const modalRefs = {
    images: useRef<HTMLDivElement>(null),
    videos: useRef<HTMLDivElement>(null),
    documents: useRef<HTMLDivElement>(null),
    audio: useRef<HTMLDivElement>(null),
  };

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openModal &&
        modalRefs[openModal as keyof typeof modalRefs]?.current &&
        !modalRefs[openModal as keyof typeof modalRefs].current?.contains(
          event.target as Node,
        )
      ) {
        setOpenModal(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({
      
    });
  };

  return (
    <>
      <div className="mt-[5px] size-fit" onClick={onOpen}>
        {btn}{" "}
      </div>
      <Modal
        size="5xl"
        classNames={{
          base: "max-h-[800px]", // Altura máxima del modal
          body: "overflow-y-auto", // Desplazamiento vertical si el contenido es muy largo
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="max-h-[800px]">
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col">
                {" "}
                <div className="h-[500px]">
                  <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col"
                  >
                    <div className="flex gap-10 border-b p-6">
                      <button
                        onClick={() => setActiveView("course")}
                        className={`border-b-2 pb-1 hover:border-DashCCd_blue ${
                          activeView === "course"
                            ? "border-DashCCd_blue"
                            : "border-slate-200"
                        }`}
                      >
                        <h2 className="text-xl font-semibold">Flows</h2>
                      </button>
                      <button
                        onClick={() => setActiveView("platform")}
                        className={`border-b-2 pb-1 hover:border-DashCCd_blue ${
                          activeView === "platform"
                            ? "border-DashCCd_blue"
                            : "border-slate-200"
                        }`}
                      >
                        <h2 className="text-xl font-semibold">Bots</h2>
                      </button>
                      <button
                        onClick={() => setActiveView("view")}
                        className={`border-b-2 pb-1 hover:border-DashCCd_blue ${
                          activeView === "view"
                            ? "border-DashCCd_blue"
                            : "border-slate-200"
                        }`}
                      >
                        <h2 className="text-xl font-semibold">Templates</h2>
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      <div
                        className={activeView === "course" ? "block" : "hidden"}
                      >
                        <SelectFlows onSeleccion={setFlowSeleccionado} />
                      </div>

                      <div
                        className={
                          activeView === "platform" ? "block" : "hidden"
                        }
                      >
                        <SelectBots onSeleccionBots={setbotSeleccionado} />

                        {botSeleccionado && (
                          <div className="mt-4">
                            <h3>
                              Total de bots seleccionados:{" "}
                              {botSeleccionado.length}
                            </h3>
                            <ul>
                              {botSeleccionado.map((bot) => (
                                <li key={bot.id}>{bot.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div
                        className={`h-full ${activeView === "view" ? "block" : "hidden"}`}
                      >
                        <div className="flex h-full flex-col justify-between">
                          <SelectTemplates onSeleccion={setFlowSeleccionado} />

                          {flowSeleccionado && (
                            <p>Nombre: {flowSeleccionado.name}</p>
                          )}
                          <button
                            onClick={handleSubmit2}
                            className="mt-4 rounded-2xl bg-blue-500 p-4 text-white"
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
