import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  CursoService,
  deletebot,
  SearchCurso,
} from "@/services/Cursos-Api/PushAPI";

import { Search, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Modalcont from "./Modals/Modalcont";
import { FaChevronDown, FaChevronRight, FaPlusCircle } from "react-icons/fa";
import Modalcreate from "@/app/curso/Components/Modals/ModalCreate";
import ModalEdit from "./Modals/ModalEdit";
import { ICurso } from "@/types/apiResponseCurso";

const AdminCursos = () => {
  const [openCourseId, setOpenCourseId] = useState(null);
  const [curso, setCursos] = useState<ICurso[]>([]);

  const toggleCourseDetails = (courseId: any) => {
    setOpenCourseId(openCourseId === courseId ? null : courseId);
  };
  const [cursos, setCurso] = useState<ICurso[]>([]);

  const [orderBy, setOrderBy] = useState("fechaCreacion");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCursos = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await SearchCurso.Search(term);
      setCursos(data);
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

    return () => clearTimeout(timer);
  }, [searchTerm, updateFlag]);

  const handleSearchChange = (e: { target: { value: any } }) => {
    setSearchTerm(e.target.value);
  };

  const deleteData = async (IdCurso: number) => {
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
      await deletebot.EliminarBot(IdCurso);
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

  // const handleSort = (campo: React.SetStateAction<string>) => {
  //   if (orderBy === campo) {
  //     setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setOrderBy(campo);
  //     setOrderDirection("asc");
  //   }
  // };

  // const getSortIndicator = (campo: string) => {
  //   if (orderBy !== campo) return null;

  //   return orderDirection === "asc" ? (
  //     <ChevronUp className="ml-1 h-4 w-4" />
  //   ) : (
  //     <ChevronDown className="ml-1 h-4 w-4" />
  //   );
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Administrador</h1>
        </div>

        {/* Filters and search */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="relative min-w-64 flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Modalcreate
              btnTrigger={
                <button className="rounded-xl bg-blue-600 p-2 px-4 text-white">
                  Crear curso
                </button>
              }
              // Objeto completo

              onUpdate={() => setUpdateFlag((prev) => !prev)}
            />
          </div>
        </div>

        {/* Estado de carga y error */}
        {loading && (
          <p className="text-center text-gray-500">Cargando cursos...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Table */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="min-w-full divide-y divide-gray-200">
              <div className="grid grid-cols-4 bg-gray-50 px-6 py-3">
                <div className="col-span-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Curso
                </div>
                <div className="col-start-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Nomenclatura
                </div>
                <div className="col-start-4 row-start-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Estado
                </div>
                <div className="col-start-5 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Acciones
                </div>
              </div>

              {/* Table Body */}
              {curso.length === 0 && !loading ? (
                <div className="px-6 py-4 text-center text-gray-500">
                  No se encontraron cursos con los criterios de búsqueda.
                </div>
              ) : (
                curso.map((curso) => (
                  <div key={curso.id} className="divide-y divide-gray-200">
                    {/* Course Main Row */}
                    <div className="grid grid-cols-4 items-center px-6 py-4 hover:bg-gray-50">
                      <div className="col-span-2 flex items-center">
                        <button
                          disabled={curso.status === 0}
                          onClick={() => toggleCourseDetails(curso.id)}
                          className={`mr-4 text-gray-500 hover:text-gray-700`}
                        >
                          {openCourseId === curso.id && curso.status !== 0 ? (
                            <FaChevronDown className="h-4 w-4" />
                          ) : (
                            <FaChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        <div className="mr-4 h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                          <img
                            src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg"
                            alt="hola"
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {curso.nombre}
                          </div>
                        </div>
                      </div>
                      <div className="col-start-3 text-sm text-gray-900">
                        {curso.nomenclatura}
                      </div>
                      <div className="col-start-4 row-start-1">
                        {curso.status === 1 ? (
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold leading-5 text-green-800">
                            Activado
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold leading-5 text-yellow-800">
                            Desactivado
                          </span>
                        )}
                      </div>
                      <div className="col-start-5">
                        <div className="flex w-[60px] items-center justify-end gap-2">
                          {/* {curso.status === 1 ? (
                            <ModalEdit
                              IdCurso={curso.id}
                              btn={
                                <Edit className="h-5 w-5 text-blue-600 hover:text-blue-900" />
                              }
                              onUpdate={() => setUpdateFlag((prev) => !prev)}
                            />
                          ) : (
                            <Modalcont
                              IdCurso={curso.id}
                              btn={
                                <FaPlusCircle className="h-5 w-5 text-green-500 hover:text-green-900" />
                              }
                              status={curso.status}
                              onUpdate={() => setUpdateFlag((prev) => !prev)}
                            />
                          )} */}

                          <ModalEdit
                            IdCurso={curso.id}
                            btn={
                              <Edit className="h-5 w-5 text-blue-600 hover:text-blue-900" />
                            }
                            onUpdate={() => setUpdateFlag((prev) => !prev)}
                          />
                          <button
                            onClick={() => deleteData(curso.id)}
                            className={`text-red-600 hover:text-red-900 `}
                          >
                            {/* ${
                              curso.status === 0 ? "hidden" : "block"
                            } */}
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Details Row */}
                    {openCourseId === curso.id && (
                      <div
                        className={`bg-gray-50 px-6 py-4 ${
                          curso.status === 0 ? "hidden" : "block"
                        }`}
                      >
                        <div className="mx-auto grid grid-cols-2 items-center justify-center gap-4 text-sm">
                          <div className="rounded-xl bg-blue-300 p-3">
                            <p className="font-medium text-gray-700">
                              Flujo Asignado:
                            </p>
                            <div className="text-gray-500">
                              {curso.flowNombre}
                            </div>
                          </div>
                          <div className="rounded-xl bg-blue-300 p-3">
                            <p className="font-medium text-gray-700">
                              Template asignado:
                            </p>
                            <p className="text-gray-500">
                              {curso.templateNombre}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCursos;
