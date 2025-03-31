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
import { Flow, IBot } from "@/types/flows";
import { Bots } from "@/types/flows";
import { BotService, CursoService } from "@/services/Cursos-Api/PushAPI";
import { ICurso } from "@/types/apiResponseCurso";
import { data } from "framer-motion/client";
import Swal from "sweetalert2";

interface DataCurso {
  IdCurso: number;
  status: number;
  btn: ReactNode;
  onUpdate?: () => void;
}

export default function App({ IdCurso, btn, status, onUpdate }: DataCurso) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [activeView, setActiveView] = useState<"course" | "platform" | "view">(
    "course",
  );

  const [flowSeleccionado, setFlowSeleccionado] = useState<Flow | null>(null);
  const [botSeleccionado, setbotSeleccionado] = useState<IBot[] | null>(null);
  const [templateSeleccionado, settemplateSeleccionado] = useState<Flow | null>(
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
        showConfirmButton: false, // Oculta el botón de confirmación
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
        showConfirmButton: false, // Oculta el botón de confirmación
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
        title: "!Flow y templates agregados  correctamente!",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({});
  };

  return (
    <>
      <button className="size-fit" onClick={onOpen}>
        {btn}
      </button>
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

                    <div className="flex-1 overflow-y-auto p-6">
                      <div
                        className={activeView === "course" ? "block" : "hidden"}
                      >
                        <SelectFlows onSeleccion={setFlowSeleccionado} />
                      </div>

                      {/* <div
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
                      </div> */}

                      <div
                        className={`h-full ${activeView === "view" ? "block" : "hidden"}`}
                      >
                        <div className="flex h-full flex-col justify-between">
                          <SelectTemplates
                            onSeleccion={settemplateSeleccionado}
                          />

                          {templateSeleccionado && (
                            <p>Nombre: {templateSeleccionado.name}</p>
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
