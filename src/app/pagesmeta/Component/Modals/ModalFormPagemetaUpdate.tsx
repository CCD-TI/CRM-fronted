"use client";
import { PaginasCreate, PaginasUpdate } from "@/services/Leads-api/Paginas";
import { paginas } from "@/types/leads/paginas";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Switch,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown,
} from "@heroui/react";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface ModalFormProps {
  btnCreate: React.ReactNode;
  datapage: paginas; // Cambio: ahora recibe un objeto de tipo paginas, no un array
  onUpdate?: () => void;
}

export default function ModalForm({
  btnCreate,
  datapage,
  onUpdate,
}: ModalFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    RedPaginaId: "",
    status: 0
  });
  const [automaticUpdates, setAutomaticUpdates] = useState(0);

  // Utilizamos useEffect para actualizar el estado cuando cambian los props
  useEffect(() => {
    if (datapage && Object.keys(datapage).length > 0) {
      setFormData({
        name: datapage.name || "",
        RedPaginaId: datapage.RedPaginaId
          ? datapage.RedPaginaId.toString(): "",
      status: datapage.status|| 0,
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
        status: automaticUpdates,
      };

      // Usamos el ID de la página que estamos editando
      const cursoCreado = await PaginasUpdate.Update(
        datosActualizados,
        datapage.id,
      );

      Swal.fire({
        icon: "success",
        title: "¡Página actualizada correctamente!",
        text: "Buen trabajo!!",
        timer: 8000,
        showConfirmButton: true,
      });

      // Limpiar selecciones y cerrar modal
      setFormData({ name: "", RedPaginaId: "" ,status: 0 });

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

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <button className="inline-flex items-center rounded-lg bg-transparent p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="faded">
          <DropdownItem key="new" isDisabled={datapage.status === 0 ? true : false}>{btnCreate}</DropdownItem>
          <DropdownItem key="copy">
            <div
              onClick={onOpen}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </div>  
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isKeyboardDismissDisabled
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="m-3 flex justify-between gap-1">
                <h1>Actualizar página</h1>
                <Switch
                  classNames={{
                   
                    wrapper: "!bg-blue-600",
                   
                  }}
                 
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

                  <Button className="bg-blue-600" onClick={sendDatapage}>
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
