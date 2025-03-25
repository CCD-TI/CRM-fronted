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


interface DataCurso {
  Data: [];
  btn: ReactNode;
}

export default function App({ Data, btn }: DataCurso) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [activeView, setActiveView] = useState<"course" | "platform" | "view">(
    "course",
  );

  const [flowSeleccionado, setFlowSeleccionado] = useState<Flow | null>(null);
  const [botSeleccionado, setbotSeleccionado] = useState<Bots[] | null>(null);
  const [templateSeleccionado, setTemplateseleccionado] = useState<Flow | null>(null);

 
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
      title,
      duration,
      price,
      level,
      images,
      videos,
      documents,
      audioFiles,
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
                        <div className="flex flex-col gap-10">
                          <SelectFlows onSeleccion={setFlowSeleccionado} />

                          <div className="flex w-full flex-col gap-4 rounded-lg border-2 p-2">
                            <h1 className="border-b-1 pb-2 font-bold">
                              Flujo Actual
                            </h1>
                            <div className="flex flex-wrap gap-3 p-4">
                              {/* Mapea un array de "cantidad" elementos y genera los divs */}

                              <div className="flex w-full items-center justify-between rounded-lg bg-gray-200 p-4">
                                <h1>masivos T-3000</h1>
                                <IoCloseCircle className="cursor-pointer text-2xl text-red-600 hover:text-red-900" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          activeView === "platform" ? "block" : "hidden"
                        }
                      >
                        <div className="flex flex-col gap-10">
                          <SelectBots onSeleccionBots={setbotSeleccionado} />

                          <div className="flex w-full flex-col gap-4 rounded-lg border-2 p-2">
                            <h1 className="border-b-1 pb-2 font-bold">
                              Bots Afiliados al curso
                            </h1>
                            <div className="flex flex-wrap gap-3">
                              {/* Mapea un array de "cantidad" elementos y genera los divs */}
                              {Array.from({ length: 20 }).map((_, index) => (
                                <div
                                  key={index}
                                  className="w-[100px] bg-gray-200 p-2"
                                >
                                  <div className="flex w-full items-center justify-between gap-1">
                                    <h1>Bot {index + 1}</h1>
                                    <IoCloseCircle className="cursor-pointer text-xl text-red-600 hover:text-red-900" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`h-full ${activeView === "view" ? "block" : "hidden"}`}
                      >
                        <div className="flex h-full flex-col justify-between">
                          <SelectTemplates onSeleccion={setTemplateseleccionado} />

                          {flowSeleccionado && (
                            <div className="mt-4 rounded-lg bg-gray-100 p-4">
                              <h2 className="font-semibold">
                                Detalles de la plantilla:
                              </h2>
                              <p>Nombre: {flowSeleccionado.name}</p>
                              <p>ID: {flowSeleccionado.id}</p>
                            </div>
                          )}
                          <button className="mt-4 rounded-2xl bg-blue-500 p-4 text-white">
                            Actualizar
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
