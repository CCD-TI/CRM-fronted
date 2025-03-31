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
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import {
  CampaingCreate,
  CampaingDelete,
  CampaingView,
} from "@/services/Leads-api/Campaing";
import { campanas } from "@/types/leads/paginas";
import ModalFormcampaingUpdate from "../Component/Modals/ModalFormcampaingUpdate";

interface Curso {
  id: number;
  nombreCampana: string;
  idFormulario: string;
  fechaCreacion: string;
  estado: "Activo" | "Inactivo" | "Pendiente";
}

interface PropsFormCampaing {
  Content: ReactNode;
  Campaing?: string;
}

export default function App({ Content, Campaing }: PropsFormCampaing) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const paginaId = Number(searchParams.get("paginaId"));
  const [updateFlag, setUpdateFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [campaing, setcampaing] = useState<campanas[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    RedCampanaId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (!formData.RedCampanaId) {
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
      // 1. Actualizar el curso existente (no crear nuevo)
      const dataForm = {
        name: formData.name,
        RedCampanaId: Number(formData.RedCampanaId),
        paginaId: Number(paginaId),
        status: 1,
      };

      const cursoCreado = await CampaingCreate.create(dataForm);
      //   setCurso(cursoCreado);

      Swal.fire({
        icon: "success",
        title: "!Pagina agregada correctamente!",
        text: "Buen trabajo!!",
        timer: 8000,
        showConfirmButton: true,
      });

      // 4. Limpiar selecciones y cerrar modala
      setFormData({ name: "", RedCampanaId: "" });
      // 5. Actualizar vista principal (si está en un contexto)
      setUpdateFlag((prev) => !prev); // Cambia entre true/false
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

  const fetchCursos = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await CampaingView.ViewData(term, paginaId);
      setcampaing(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al cargar cursos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Datos recibidos del backend:", campaing);
      fetchCursos(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, updateFlag]);

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
      await CampaingDelete.delete(Idpagina);
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [cursos, setCursos] = useState<Curso[]>([
    {
      id: 1,
      nombreCampana: "Desarrollo Web Full Stack",
      idFormulario: "FORM-WEB-001",
      fechaCreacion: "2023-05-15",
      estado: "Activo",
    },
    {
      id: 2,
      nombreCampana: "Python para Ciencia de Datos",
      idFormulario: "FORM-PY-002",
      fechaCreacion: "2023-06-20",
      estado: "Activo",
    },
    {
      id: 3,
      nombreCampana: "JavaScript Avanzado",
      idFormulario: "FORM-JS-003",
      fechaCreacion: "2023-07-10",
      estado: "Pendiente",
    },
    {
      id: 4,
      nombreCampana: "React Native para Móviles",
      idFormulario: "FORM-RN-004",
      fechaCreacion: "2023-08-05",
      estado: "Inactivo",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para el curso seleccionado para editar
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

  // Estado para el formulario

  // Estado para la búsqueda
  // Estado para el filtro de estado
  const [estadoFilter, setEstadoFilter] = useState("todos");

  // Estado para la ordenación
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Curso | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  //
  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este curso?")) {
      setCursos(cursos.filter((curso) => curso.id !== id));
    }
  };

  // Función para ordenar
  const requestSort = (key: keyof Curso) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filtrar y ordenar cursos
  const filteredAndSortedCursos = cursos
    .filter((curso) => {
      // Filtrar por término de búsqueda
      const matchesSearch =
        curso.nombreCampana.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.idFormulario.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtrar por estado
      const matchesEstado =
        estadoFilter === "todos" ||
        curso.estado.toLowerCase() === estadoFilter.toLowerCase();

      return matchesSearch && matchesEstado;
    })
    .sort((a, b) => {
      // Si no hay configuración de ordenación, no ordenar
      if (!sortConfig.key) return 0;

      // Ordenar según la configuración
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // Paginación
  const paginatedCursos = filteredAndSortedCursos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Total de páginas
  const totalPages = Math.ceil(filteredAndSortedCursos.length / itemsPerPage);

  return (
    <>
      <div>
        <div className="flex size-full flex-col gap-6 py-10">
          <h1 className="text-3xl">
            <b>PAGINA:</b> {name}
          </h1>

          <div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col">
                <label htmlFor="">Nombre De campaña:</label>
                <input
                  type="text"
                  value={formData.name}
                  className="rounded-xl border-2 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  } // ✅ Maneja cambios
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">ID De Formulario:</label>
                <input
                  type="text"
                  value={formData.RedCampanaId}
                  className="rounded-xl border-2 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, RedCampanaId: e.target.value })
                  } // ✅ Maneja cambios
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Pagina Meta:</label>
                <input
                  disabled
                  type="text"
                  value={name || ""}
                  className="rounded-xl border-2 p-2"
                />
              </div>
              <button
                onClick={sendDatapage}
                className="mx-auto w-[200px] rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {" "}
                crear campaña
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Cabecera de la tabla */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Campañas
              </h2>

              <div className="flex flex-col gap-3 md:flex-row">
                {/* Buscador */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-[300px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Buscar campaña..."
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
          {loading && (
            <p className="text-center text-gray-500">Cargando cursos...</p>
          )}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
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
                    onClick={() => requestSort("nombreCampana")}
                  >
                    <div className="flex items-center">
                      Nombre de Campaña
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("idFormulario")}
                  >
                    <div className="flex items-center">
                      ID de Formulario
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("fechaCreacion")}
                  >
                    <div className="flex items-center">
                      Fecha de Creación
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer px-6 py-3"
                    onClick={() => requestSort("estado")}
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
                {campaing.length > 0 ? (
                  campaing.map((campana) => (
                    <tr
                      key={campana.id}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        #{campana.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {campana.name}
                      </td>
                      <td className="px-6 py-4">{campana.RedCampanaId}</td>
                      <td className="px-6 py-4">
                        {new Date(campana.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            campana.status === 1
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : campana.status === 0
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {campana.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end ">
                          <Link href="/pagesmeta/campaigns/form">
                            <button
                              className="mr-3 flex items-center gap-2 rounded-xl bg-green-100 p-2 text-green-800 dark:bg-green-900 dark:text-green-300"
                              // onClick={() => handleEdit(curso)}
                            >
                              <GrDocumentPerformance className="h-5 w-5" />{" "}
                              Agregar Form
                            </button>
                          </Link>

                          <ModalFormcampaingUpdate
                            btnCreate={
                              <button
                                className="flex  mt-2 items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                // onClick={() => handleEdit(curso)}
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                            }
                            datapage={campana}
                            onUpdate={() => setUpdateFlag((prev) => !prev)}
                          />

                          <button
                            onClick={() => deleteData(campana.id)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-gray-700 dark:text-red-400 dark:hover:text-gray-700"
                          >
                            <Trash2 className="mr-2 h-5 w-5" />
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

          {/* Paginación */}
          {/* {filteredAndSortedCursos.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Anterior
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Siguiente
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    a{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredAndSortedCursos.length,
                      )}
                    </span>{" "}
                    de{" "}
                    <span className="font-medium">
                      {filteredAndSortedCursos.length}
                    </span>{" "}
                    resultados
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <span className="sr-only">Anterior</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`relative inline-flex items-center border px-4 py-2 ${
                            currentPage === pageNumber
                              ? "z-10 border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400"
                              : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                          } text-sm font-medium`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <span className="sr-only">Siguiente</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Modal para editar curso */}
      </div>
    </>
  );
}
