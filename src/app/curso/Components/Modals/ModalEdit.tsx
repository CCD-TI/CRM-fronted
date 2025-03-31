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
import { MdInsertPhoto } from "react-icons/md";
import SelectFlows from "../DropdownList/SelectFlows";
import SelectBots from "../DropdownList/SelectBots";
import { IoCloseCircle } from "react-icons/io5";
import SelectTemplates from "../DropdownList/SelectTemplates";
import { Flow } from "@/types/flows";
import { Bots } from "@/types/flows";
import { ICurso } from "@/types/apiResponseCurso";
import { CursoService, ViewCursoId } from "@/services/Cursos-Api/PushAPI";
import Swal from "sweetalert2";

interface DataCurso {
  IdCurso: number;
  btn: ReactNode;
  onUpdate?: () => void;
}

interface IBot {
  id: number;
  name: string;
}

interface IBotApp {
  botId: number;
  botNombre: string;
}

export default function App({ IdCurso, btn, onUpdate  }: DataCurso) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeView, setActiveView] = useState<"course" | "platform" | "view">(
    "course",
  );

 

  const [flowSeleccionado, setFlowSeleccionado] = useState<Flow | null>(null);
  const [botSeleccionado, setbotSeleccionado] = useState<IBot[] | undefined>(
    undefined,
  );
  const [templateSeleccionado, setTemplateseleccionado] = useState<Flow | null>(
    null,
  );
  const [curso, setCurso] = useState<ICurso | null>(null);


  const handleSubmit2 = async () => {
      
  
    // Validaciones mejoradas con SweetAlert2
    if (!flowSeleccionado) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Por favor selecciona un flow",
        timer: 2000, // El mensaje desaparecerá después de 3 segundos
        timerProgressBar: true, // Muestra una barra de progreso del timer
        showConfirmButton: false // Oculta el botón de confirmación
      });
      return;
    }
    if (!templateSeleccionado) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Por favor selecciona un template",
        timer: 2000, // El mensaje desaparecerá después de 3 segundos
        timerProgressBar: true, // Muestra una barra de progreso del timer
        showConfirmButton: false // Oculta el botón de confirmación
      });
      return;
    }

    // if (!botSeleccionado || botSeleccionado.length === 0) {
    //   Swal.fire("Error", "Por favor selecciona al menos un bot", "warning");
    //   return;
    // }

    try {
      // Mostrar loader mientras se procesa
      // Swal.fire({
      //   title: "Procesando...",
      //   allowOutsideClick: false,
      //   didOpen: () => Swal.showLoading(),
      // });

      // 1. Actualizar el curso existente (no crear nuevo)
      const datosActualizados = {
        flowId: flowSeleccionado.id,
        flowNombre: flowSeleccionado.name,
        templateNombre: templateSeleccionado?.name,
        status: 1,
      };

      const cursoCreado = await CursoService.createCurso(
        datosActualizados,
        IdCurso,
      );
      setCurso(cursoCreado);

      // 2. Actualizar relaciones con bots (reemplazar todas)
      // const botData = {
      //   cursoId: IdCurso, // Usamos el ID del curso recién creado
      //   botsId: botSeleccionado.map((bot) => bot.id),
      //   botsNombre: botSeleccionado.map((bot) => bot.name),
      // };
      // await BotService.createCurso(botData);

      // 3. Notificar éxito y cerrar modal
      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: "El curso se actualizó correctamente",
        timer: 8000,
        showConfirmButton: true,
      });

      // 4. Limpiar selecciones y cerrar modala
      
      // 5. Actualizar vista principal (si está en un contexto)
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar la actualización",
        footer: error instanceof Error ? error.message : "",
      });

      // Rollback visual (opcional)
      // if (curso) {
      //   setCurso(null); // O restaurar el estado anterior
      // }
    }
  };

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const data = await ViewCursoId.VieId(IdCurso);
        setCurso(data);
        // setbotSeleccionado((data.bots as unknown as IBotApp[]).map(bot => ({
        //   id: bot.botId,
        //   name: bot.botNombre
        // }))); // Asigna los bots del curso a la variable de estado
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (IdCurso) fetchCurso();
  }, [IdCurso]);
  // Refs for modal click outside detection

  // Handle click outside to close modal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="size-fit" onClick={onOpen}>
        {btn}
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
                      {/* <button
                        onClick={() => setActiveView("platform")}
                        className={`border-b-2 pb-1 hover:border-DashCCd_blue ${
                          activeView === "platform"
                            ? "border-DashCCd_blue"
                            : "border-slate-200"
                        }`}
                      >
                        <h2 className="text-xl font-semibold">Bots</h2>
                      </button> */}
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

                    {curso ? (
                      <div className="flex-1 overflow-y-auto p-6">
                        <div
                          className={
                            activeView === "course" ? "block" : "hidden"
                          }
                        >
                          <div className="flex flex-col gap-10">
                            <SelectFlows onSeleccion={setFlowSeleccionado} />

                            <div className="flex w-full flex-col gap-4 rounded-lg border-2 p-2">
                              <h1 className="border-b-1 pb-2 font-bold">
                                Flujo Actual
                              </h1>
                              <div className="flex flex-wrap gap-3 p-4">
                                {/* Mapea un array de "cantidad" elementos y genera los divs */}

                                <div className="flex w-full items-center justify-between rounded-lg bg-gray-200 p-4">
                                  <h1>{curso.flowNombre} </h1>
                                  {/* <IoCloseCircle className="cursor-pointer text-2xl text-red-600 hover:text-red-900" /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div
                          className={
                            activeView === "platform" ? "block" : "hidden"
                          }
                        >
                          <div className="flex flex-col gap-10">
                            <SelectBots  botSeleccionados={botSeleccionado}  onSeleccionBots={setbotSeleccionado} />

                            <div className="flex w-full flex-col gap-4 rounded-lg border-2 p-2">
                              <h1 className="border-b-1 pb-2 font-bold">
                                Bots Afiliados al curso
                              </h1>
                              <div className="flex flex-wrap gap-3">
                                
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <div
                          className={`h-full ${activeView === "view" ? "block" : "hidden"}`}
                        >
                          <div className="flex h-full flex-col justify-between">
                            <SelectTemplates
                              onSeleccion={setTemplateseleccionado}
                            />

                            <div className="mt-4 rounded-lg bg-gray-100 p-4">
                              <h2 className="font-semibold">
                                Detalles de la plantilla:
                              </h2>
                              <p>Nombre: {curso.templateNombre}</p>
                            </div>

                            <button
                            onClick={handleSubmit2}
                             className="mt-4 rounded-2xl bg-blue-500 p-4 text-white">
                              Actualizar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>cargando....</p>
                    )}
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
