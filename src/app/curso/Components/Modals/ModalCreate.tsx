"use client";
import { ReactNode, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Switch
} from "@heroui/react";
import Swal from "sweetalert2";
import { CreateCurso } from "@/services/Cursos-Api/PushAPI";
import { Flow } from "@/types/flows";
import SelectFlows from "../DropdownList/SelectFlows";

interface propsData{
    btnTrigger: ReactNode
    onUpdate?: () => void;
}

export default function CursoForm({btnTrigger,onUpdate}:propsData) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [flow, setFlow]= useState<Flow | null>(null)
  const [template, settemplateNombre]= useState<Flow | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    Nomenclatura: "",
   
  });

    const handleSubmit2 = async () => {
      // Validaciones mejoradas con SweetAlert2
      if (!formData.nombre) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor desisgne un nombre",
          timer: 2000, // El mensaje desaparecerá después de 3 segundos
          timerProgressBar: true, // Muestra una barra de progreso del timer
          showConfirmButton: false, // Oculta el botón de confirmación
        });
        return;
      }
      if (!formData.Nomenclatura) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor declare una nomenclatura",
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
            nombre:formData.nombre,
            nomenclatura:formData.Nomenclatura ,
            flowId: flow?.id,
            flowNombre: flow?.name,
            templateNombre: template?.name,
            status: 1
          
        };
  
        const cursoCreado = await CreateCurso.create(datosActualizados);
        setFormData({
          nombre: "",
          Nomenclatura: "",
        });
        // setCurso(cursoCreado);
  
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleStatusChange = (isActive: boolean) => {
    setFormData(prev => ({ ...prev, status: isActive ? 1 : 0 }));
  };

  const handleSubmit = async (onClose: () => void) => {
    try {
      // Aquí iría tu lógica para guardar el curso
      console.log("Datos del curso:", formData);
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <>
    <div onClick={onOpen}>

     {btnTrigger}
    </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center m-3 ">
              
               Nuevo Curso
                {/* <Switch
                  isSelected={formData.status === 1}
                //   onChange={handleStatusChange}
                  color="primary"
                >
                  {formData.status === 1 ? "Activo" : "Inactivo"}
                </Switch> */}
             
              </ModalHeader>
              
              <ModalBody className="space-y-4 ">
                <Input
                  label="Nombre del Curso"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  isRequired
                  placeholder="Ej: Marketing Digital"
                />
                
                <Input
                  label="Nomenclatura"
                  name="Nomenclatura"
                  value={formData.Nomenclatura}
                  onChange={handleChange}
                  placeholder="Ej: MKT-101"
                />
                
                 <SelectFlows  onSeleccion={setFlow}/>
                 <SelectFlows  onSeleccion={settemplateNombre}/>
              </ModalBody>
              
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => handleSubmit2()}>
                  Guardar Curso
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}