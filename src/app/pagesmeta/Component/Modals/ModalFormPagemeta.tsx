
"use client";
import { PaginasCreate } from "@/services/Leads-api/Paginas";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ModalFormProps {
  btnCreate: React.ReactNode;
  onUpdate?: () => void;
}

export default function ModalForm({ btnCreate, onUpdate }: ModalFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ name: "", RedPaginaId: "" });

  const sendDatapage = async () => {
    try {
      if (!formData.name) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor designe el nombre",
          timer: 2000, // El mensaje desaparecerá después de 3 segundos
          timerProgressBar: true, // Muestra una barra de progreso del timer
          showConfirmButton: false, // Oculta el botón de confirmación
        });
        return;
      }
      if (!formData.RedPaginaId) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor digite el ID de la página",
          timer: 2000, // El mensaje desaparecerá después de 3 segundos
          timerProgressBar: true, // Muestra una barra de progreso del timer
          showConfirmButton: false, // Oculta el botón de confirmación
        });
        return;
      }
      // 1. Actualizar el curso existente (no crear nuevo)
      const datosActualizados = {
        name: formData.name,
        RedPaginaId: Number(formData.RedPaginaId),
      };

      const cursoCreado = await PaginasCreate.createPaginas(datosActualizados);
      //   setCurso(cursoCreado);

      Swal.fire({
        icon: "success",
        title: "!Pagina agregada correctamente!",
        text: "Buen trabajo!!",
        timer: 8000,
        showConfirmButton: true,
      });

      // 4. Limpiar selecciones y cerrar modala
      setFormData({ name: "", RedPaginaId: "" }); 
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === "RedPaginaId" ? value.replace(/\D/g, "") : value, // Solo números en RedPaginaId
    }));
  };
  return (
    <>
      <div onClick={onOpen}>{btnCreate}</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Publicidad
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre de la publicidad"
                    className="w-full rounded border p-2"
                    value={formData.name}
                    onChange={handleChange}

                  />
                  
                  <input
                    type="number"
                    name="RedPaginaId"
                    placeholder="ID de la Página"
                    className="w-full rounded border p-2"
                    value={formData.RedPaginaId}
                    onChange={handleChange}
                  />
                  <Button color="primary" onClick={sendDatapage}>
                    Guardar
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
