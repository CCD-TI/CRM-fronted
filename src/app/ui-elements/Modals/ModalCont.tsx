// import { CameraIcon } from "@/app/profile/_components/icons";
import ChartPieUser from "@/components/ChartCCD/ChartPieUser";
import ChartUSer from "@/components/ChartCCD/ChartUSer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { ReactNode } from "react";

interface PropsModal {
  Data: ReactNode;
  DataPrecio: [];
  Datalabel: [];
}

export default function App({ Data, DataPrecio, Datalabel }: PropsModal) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}> {Data}</div>
      <Modal
        classNames={{
          body: "bg-slate-100",
          closeButton: "m-4 bg-blue-600 text-black"
        }}
        
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent
 
        style={
         
            {
                width: "60%", // Ajusta el ancho del modal
                maxWidth: "100%", // Tamaño máximo opcional
                height: "80vh", // Ajusta la altura del modal
                maxHeight: "90vh", // Tamaño máximo opcional
            }
        }>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader> */}
              <ModalBody className="!flex justify-center items-center h-full">
                <div className="flex flex-col justify-center gap-10 p-8">
                  <div className="flex justify-start items-center gap-4 p-6 bg-white shadow-lg rounded-xl ">
                    <Image
                      src="/images/user/user-04.png"
                      alt="user"
                      width={150}
                      height={150}
                      className="rounded-full"
                    />

                    <div >
                      <h1 className="font-bold text-2xl">Carlos oliveira</h1>
                      <h2><b>Area:</b>ventas</h2>
                      <h2><b>Cargo:</b>Asesor</h2>
                      <h2><b>Estado:</b> Online</h2>
                    </div>
                  </div>
                  {/* que sea dinamico segun rol OJO  */}
                  <div className="flex justify-center gap-10">
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                      <ChartUSer />
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                      <ChartPieUser
                        dataPrecio={DataPrecio}
                        dataIndicador={Datalabel}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-DashCCd_blue text-white" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
