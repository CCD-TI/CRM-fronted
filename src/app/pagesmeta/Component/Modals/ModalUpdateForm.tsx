"use client";
import { FormUpdate } from "@/services/Leads-api/Form";
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
import { data } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DropdownCursos from "../Drowdownlist/dropdownCursos";
import SelectBots from "@/app/curso/Components/DropdownList/SelectBots";
import { ICurso } from "@/types/apiResponseCurso";
import DropdowmListUpdate from "../Drowdownlist/DropdowmListUpdate";
import Dropdowmbotupdate from "../Drowdownlist/Dropdowmbotupdate";
import { IBot } from "@/types/flows";

interface ModalFormProps {
  btnCreate: React.ReactNode;
  datapage: Formulario; // Cambio: ahora recibe un objeto de tipo paginas, no un array
  onUpdate?: () => void;
}

export default function ModalForm({
  btnCreate,
  datapage,
  onUpdate,
}: ModalFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cursos, setCursos] = useState<ICurso[] | undefined>(undefined);
  const [bots, setBots] = useState<IBot[] | undefined>(undefined);
  const [formData, setFormData] = useState({
    id: 0, // Added id property
    name: "",
    RedFormularioId: "",
    cursoId: 0,
    campanaId: 0,
    botId: 0,
  });

  const [automaticUpdates, setAutomaticUpdates] = useState(0);

  // Utilizamos useEffect para actualizar el estado cuando cambian los props
  useEffect(() => {
    if (datapage && Object.keys(datapage).length > 0) {
      setFormData({
        id: datapage.id,
        name: datapage.name || "",
        RedFormularioId: datapage.RedFormularioId
          ? datapage.RedFormularioId.toString()
          : "",
        botId: datapage.botId,
        cursoId: datapage.cursoId,
        campanaId: datapage.campanaId,
      });
      setAutomaticUpdates(datapage.status || 0);
      console.log("hola", datapage);
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
      if (!formData.RedFormularioId) {
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
        RedFormularioId: formData.RedFormularioId,
        cursoId: formData.cursoId,
        campana: formData.campanaId,
        botId: formData.botId,
        status: automaticUpdates,
        id: formData.id,
      };

      // Usamos el ID de la página que estamos editando
      const FormularioUpdate = await FormUpdate.update(datosActualizados);

      Swal.fire({
        icon: "success",
        title: "¡Página actualizada correctamente!",
        text: "Buen trabajo!!",
        timer: 8000,
        showConfirmButton: true,
      });

      // Limpiar selecciones y cerrar modal

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
              <ModalHeader className="m-3 flex justify-between gap-1">
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
                  <label htmlFor="">Campaña:</label>
                  <input
                    type="text"
                    name="name"
                    disabled
                    placeholder="Nombre de la publicidad"
                    className="w-full rounded border p-2"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <label htmlFor="curso">Curso:</label>
                  <DropdowmListUpdate
                    onCursoSeleccionado={(curso) => setCursos(curso ? [curso] : [])}
                    idCursoInicial={formData.cursoId}
                  />

                  <label htmlFor="bot">Bot:</label>
                  <Dropdowmbotupdate
                   onBotSeleccionado={(bot) => setBots(bot ? [bot] : [])}
                   botIdInicial={formData.botId}
                  />
                  {/* {datapage && <p className="text-sm text-gray-500">ID actual: {datapage.id}</p>}
                   */}

                  <label htmlFor="">ID Formulario:</label>
                  <input
                    type="text"
                    name="RedPaginaId"
                    placeholder="ID de la Página"
                    className="w-full rounded border p-2"
                    value={formData.RedFormularioId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        RedFormularioId: e.target.value,
                      })
                    }
                  />
                  {/* <input
                    type="text"
                    name="RedPaginaId"
                    placeholder="ID de la Página"
                    className="w-full rounded border p-2"
                    value={formData.campanaId}
                    onChange={handleChange}
                  />
                  */}
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
