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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "videos" | "documents" | "audio",
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      switch (type) {
        case "images":
          setImages((prev) => [...prev, ...filesArray]);
          break;
        case "videos":
          setVideos((prev) => [...prev, ...filesArray]);
          break;
        case "documents":
          setDocuments((prev) => [...prev, ...filesArray]);
          break;
        case "audio":
          setAudioFiles((prev) => [...prev, ...filesArray]);
          break;
      }
    }
  };

  const removeFile = (
    index: number,
    type: "images" | "videos" | "documents" | "audio",
  ) => {
    switch (type) {
      case "images":
        setImages((prev) => prev.filter((_, i) => i !== index));
        break;
      case "videos":
        setVideos((prev) => prev.filter((_, i) => i !== index));
        break;
      case "documents":
        setDocuments((prev) => prev.filter((_, i) => i !== index));
        break;
      case "audio":
        setAudioFiles((prev) => prev.filter((_, i) => i !== index));
        break;
    }
  };

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
                        <SelectFlows />
                      </div>

                     
                      <div
                        className={
                          activeView === "platform" ? "block" : "hidden"
                        }
                      >
                        <SelectBots />
                      </div>

                     
                      <div
                        className={activeView === "view" ? "block" : "hidden"}
                      >
                        <div className="flex h-full flex-col justify-between">
                          <SelectFlows />
                          <button className="mt-4 rounded-2xl bg-blue-500 p-4 text-white">
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
