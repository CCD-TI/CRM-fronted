"use client";
import { GrDocumentPerformance } from "react-icons/gr";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode, useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  X,
  Search,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import SelectBots from "@/app/curso/Components/DropdownList/SelectBots";
import { IBot } from "@/types/flows";
import {
  DeleteCourse,
  FormCreate,
  ViewCourse,
} from "@/services/Leads-api/Form";
import DropdownCursos from "../../Component/Drowdownlist/dropdownCursos";
import { ICurso } from "@/types/apiResponseCurso";
import ModalUpdateForm from "../../Component/Modals/ModalUpdateForm";
import { Formulario } from "@/types/leads/paginas";

interface PropsFormCampaing {
  Content: ReactNode;
  Campaing?: string;
}

export default function Form({ Content, Campaing }: PropsFormCampaing) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const paginaId = Number(searchParams.get("paginaId"));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isModalOpen, setIsModalOpen] = useState();
  const [bots, setIsBots] = useState<IBot[]>([]);
  const [curso, setIsCurso] = useState<ICurso[]>([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Estado para el curso seleccionado para editar
  const [selectedCurso, setSelectedCurso] = useState<Formulario | null>(null);
  const [Formulario, setFormulario] = useState<Formulario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    idform: "",
  });
  const fetchCursos = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await ViewCourse.View(term);
      setFormulario(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al cargar cursos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCursos(searchTerm);
    }, 300);
    console.log("data", Formulario);
    return () => clearTimeout(timer);
  }, [searchTerm, updateFlag]);

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
      if (!formData.idform) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Por favor digite el ID de la Campaña",
          timer: 2000, // El mensaje desaparecerá después de 3 segundos
          timerProgressBar: true, // Muestra una barra de progreso del timer
          showConfirmButton: false, // Oculta el botón de confirmación
        });
        return;
      }

      const botId = bots.length > 0 ? bots[0].id : null;

      // Obtener el ID del curso seleccionado (asumiendo que tienes un estado para esto)
      const cursoId = curso.length > 0 ? curso[0].id : null;
      // 1. Actualizar el curso existente (no crear nuevo)
      const dataForm = {
        name: formData.name,
        RedFormularioId: formData.idform,
        cursoId: cursoId,
        campanaId: Number(paginaId),
        botId: botId,
      };

      const cursoCreado = await FormCreate.create(dataForm);
      //   setCurso(cursoCreado);

      Swal.fire({
        icon: "success",
        title: "!Formulario agregada correctamente!",
        text: "Buen trabajo!!",
        timer: 8000,
        showConfirmButton: true,
      });

      // 4. Limpiar selecciones y cerrar modala
      setFormData({ name: "", idform: "" });
      // 5. Actualizar vista principal (si está en un contexto)
      setUpdateFlag((prev) => !prev); // Cambia entre true/false
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar",
        footer: error instanceof Error ? error.message : "",
      });

      // Rollback visual (opcional)
      // if (curso) {
      //   setCurso(null); // O restaurar el estado anterior
      // }
    }
  };
  
    const deleteData = async (Idpagina: number) => {
    // Eliminé el parámetro 'e' ya que no es necesario
    // Paso 1: Confirmación con SweetAlert
    const confirmation = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario cancela, salimos de la función
    if (!confirmation.isConfirmed) return;

    try {
      // Paso 2: Mostrar loader mientras se procesa
      // Swal.fire({
      //   title: "Eliminando...",
      //   allowOutsideClick: false,
      //   didOpen: () => Swal.showLoading(),
      // });

      // Paso 3: Actualizar el curso
      const datosActualizados = {
        flowId: 0,
        flowNombre: "null",
        templateNombre: "null",
        status: 0,
      };

      // await CursoService.createCurso(datosActualizados, IdCurso);
      await DeleteCourse.delete(Idpagina);
      setUpdateFlag((prev) => !prev); // Cambia entre true/false

      // Paso 4: Notificar éxito
      await Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "Los datos se eliminaron correctamente",
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar la eliminación",
        footer: error instanceof Error ? error.message : "",
      });
    }
  };

  // Estado para la búsqueda

  // Estado para el filtro de estado

  // Estado para la ordenación
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Formulario | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Estado para la paginación
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  // Manejar cambios en el formulario
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // Abrir modal para editar
  // const handleEdit = (curso: Curso) => {
  //   setSelectedCurso(curso);
  //   setFormData({
  //     nombreCampana: curso.nombreCampana,
  //     idFormulario: curso.idFormulario,
  //   });
  //   setIsModalOpen(true);
  // };

  // Manejar envío del formulario
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validar que los campos no estén vacíos
  //   if (!formData.nombreCampana.trim() || !formData.idFormulario.trim()) {
  //     alert("Por favor, complete todos los campos");
  //     return;
  //   }

  //   if (selectedCurso) {
  //     // Actualizar curso existente
  //     const updatedCursos = cursos.map((curso) =>
  //       curso.id === selectedCurso.id
  //         ? {
  //             ...curso,
  //             nombreCampana: formData.nombreCampana,
  //             idFormulario: formData.idFormulario,
  //           }
  //         : curso,
  //     );
  //     setCursos(updatedCursos);
  //   }

  //   // Cerrar modal y resetear formulario
  //   setIsModalOpen(false);
  //   setSelectedCurso(null);
  //   setFormData({
  //     nombreCampana: "",
  //     idFormulario: "",
  //   });
  // };

  // Función para eliminar un curso
  // const handleDelete = (id: number) => {
  //   if (confirm("¿Está seguro de que desea eliminar este curso?")) {
  //     setCursos(cursos.filter((curso) => curso.id !== id));
  //   }
  // };

  // Función para ordenar
  const requestSort = (key: keyof Formulario) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "RedCampanaId" ? value.replace(/\D/g, "") : value, // Solo números en RedPaginaId
      }));
    };
  // Filtrar y ordenar cursos
  // const filteredAndSortedCursos = cursos
  //   .filter((curso) => {
  //     // Filtrar por término de búsqueda
  //     const matchesSearch =
  //       curso.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       curso.RedFormularioId.toLowerCase().includes(searchTerm.toLowerCase());

  //     // Filtrar por estado
  //     const matchesEstado =
  //       estadoFilter === "todos" ||
  //       String(curso.status).toLowerCase() === estadoFilter.toLowerCase();

  //     return matchesSearch && matchesEstado;
  //   })
  //   .sort((a, b) => {
  //     // Si no hay configuración de ordenación, no ordenar
  //     if (!sortConfig.key) return 0;

  //     // Ordenar según la configuración
  //     if (a[sortConfig.key] < b[sortConfig.key]) {
  //       return sortConfig.direction === "asc" ? -1 : 1;
  //     }
  //     if (a[sortConfig.key] > b[sortConfig.key]) {
  //       return sortConfig.direction === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });

  // Paginación
  // const paginatedCursos = filteredAndSortedCursos.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

  // Total de páginas
  // const totalPages = Math.ceil(filteredAndSortedCursos.length / itemsPerPage);

  return (
    <>
      <div>
        <div className="flex size-full flex-col gap-6 py-10">
          <h1 className="text-3xl">
            <b>CAMPAÑA:</b> {name}
          </h1>

          <div>
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col">
                <label htmlFor="formName">Nombre Del Formulario:</label>
                <input
                  type="text"
                  id="formName"
                  className="rounded-xl border-2 p-2"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="formId">Id Del Formulario:</label>
                <input
                  type="text"
                  id="formId"
                  className="rounded-xl border-2 p-2"
                  value={formData.idform || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, idform: e.target.value })
                  }
              
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="campaign">Campaña:</label>
                <input
                  disabled
                  value={name || ""}
                  type="text"
                  id="campaign"
                  className="rounded-xl border-2 p-2"
                />
              </div>
              <DropdownCursos onSeleccionBots={setIsCurso}  />
              <SelectBots onSeleccionBots={setIsBots} />
              <button
                onClick={sendDatapage}
                className="mx-auto w-[200px] rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                Crear Formulario
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Cabecera de la tabla */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Formularios
              </h2>

              <div className="flex flex-col gap-3 md:flex-row">
                {/* Buscador */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Buscar Formulario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filtro de Estado */}
                {/* <div className="relative inline-block">
                  <select
                    className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={estadoFilter}
                    onChange={(e) => setEstadoFilter(e.target.value)}
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Nombre del Formulario
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("RedFormularioId")}
                  >
                    <div className="flex items-center">
                      ID de Formulario
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Fecha de Creación
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Estado
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {Formulario.length > 0 ? (
                  Formulario.map((form,index) => (
                    <tr
                    
                    key={form.id }// 🔹 Clave única sin fallback inseguro
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        #{form.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {form.name}
                      </td>
                      <td className="px-6 py-4">{form.RedFormularioId}</td>
                      <td className="px-6 py-4">
                        {form.createdAt
                          ? new Date(form.createdAt).toLocaleDateString()
                          : "N/A"}
                        {/* 🔹 Manejo seguro de createdAt */}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            form.status === 1
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : form.status === 0
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {form.status === 1
                            ? "Activo"
                            : form.status === 0
                              ? "Inactivo"
                              : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <ModalUpdateForm
                            btnCreate={
                              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                <Edit className="h-5 w-5" />
                              </button>
                            }
                            
                            datapage={form}
                            onUpdate={() => setUpdateFlag((prev) => !prev)}  
                            
                          />

                          <button
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            onClick={() => deleteData(form.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white dark:bg-gray-800">
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No se encontraron cursos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal para editar curso */}
      </div>
    </>
  );
}
