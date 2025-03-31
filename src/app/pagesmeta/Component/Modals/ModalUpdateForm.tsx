"use client";
import { PaginasCreate, PaginasUpdate } from "@/services/Leads-api/Paginas";
import { Formulario, paginas } from "@/types/leads/paginas";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Switch,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface ModalFormProps {
  btnCreate: React.ReactNode;
  datapage: Formulario; // Cambio: ahora recibe un objeto de tipo paginas, no un array
  onUpdate?: () => void;
}

export default function ModalForm({ btnCreate, datapage, onUpdate }: ModalFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ 
    name: "", 
    RedPaginaId: "" 
  });
  const [automaticUpdates, setAutomaticUpdates] = useState(0);
  
  // Utilizamos useEffect para actualizar el estado cuando cambian los props
  useEffect(() => {
    if (datapage && Object.keys(datapage).length > 0) {
      setFormData({
        name: datapage.name || "",
        RedPaginaId: datapage.RedFormularioId ? datapage.RedFormularioId.toString() : "",
      });
      setAutomaticUpdates(datapage.status || 0);
    }
  }, [datapage]);

  const sendDatapage = async () => {
    try {
      if (!formData.name) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor designe el nombre",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }
      if (!formData.RedPaginaId) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor digite el ID de la página",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }
      
      // Datos actualizados para enviar
      const datosActualizados = {
        name: formData.name,
        RedPaginaId: Number(formData.RedPaginaId),
        status: automaticUpdates
      };

      // Usamos el ID de la página que estamos editando
      const cursoCreado = await PaginasUpdate.Update(datosActualizados, datapage.id);

      Swal.fire({
        icon: "success",
        title: "¡Página actualizada correctamente!",
        text: "Buen trabajo!!",
        timer: 8000,
        showConfirmButton: true,
      });

      // Limpiar selecciones y cerrar modal
      setFormData({ name: "", RedPaginaId: "" }); 
      
      // Actualizar vista principal (si está en un contexto)
      if (onUpdate) onUpdate();
      onOpenChange(); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar la actualización",
        footer: error instanceof Error ? error.message : "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "RedPaginaId" ? value.replace(/\D/g, "") : value, // Solo números en RedPaginaId
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomaticUpdates(e.target.checked ? 1 : 0);
  };

  return (
    <>
      <div onClick={onOpen}>{btnCreate}</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-1 m-3">
                <h1>Actualizar página</h1>
                <Switch
                color="primary"
                  isSelected={automaticUpdates === 1}
                  onChange={handleSwitchChange}
                >
                  {automaticUpdates === 1 ? "Activo" : "Desactivado"}
                </Switch>
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
                  
                  {/* {datapage && <p className="text-sm text-gray-500">ID actual: {datapage.id}</p>}
                   */}
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