import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { ViewCourseData } from "@/services/Cursos-Api/PushAPI";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import Modalcont from "./Modals/Modalcont";
import { FaChevronDown, FaChevronRight, FaPlusCircle } from "react-icons/fa";
import ModalEdit from "./Modals/ModalEdit";
import { Avatar, AvatarGroup } from "@heroui/react";
import { Course, ICurso } from "@/types/apiResponseCurso";



const AdminCursos = () => {
  const [openCourseId, setOpenCourseId] = useState(null);
  const [curso, setCursos] = useState<Course[]>([]);

  const toggleCourseDetails = (courseId: any) => {
    setOpenCourseId(openCourseId === courseId ? null : courseId);
  };

  const code = 2;
  const handleEliminar = (code: any) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va tu lógica de eliminación
        console.log(`Eliminando registro con ID: ${code}`);
        
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const cursos = [
    {
      id: 1,
      titulo: "React desde cero a experto",
      categoria: "Programación",
      nivel: "Intermedio",
      instructor: "Juan Pérez",
      duracion: "20 horas",
      precio: 49.99,
      publicado: true,
      imagen:
        "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 230,
      calificacion: 4.8,
      fechaCreacion: "2025-01-15",
    },
    {
      id: 2,
      titulo: "Diseño UI/UX con Figma",
      categoria: "Diseño",
      nivel: "Avanzado",
      instructor: "María García",
      duracion: "15 horas",
      precio: 39.99,
      publicado: true,
      imagen:
        "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 185,
      calificacion: 4.6,
      fechaCreacion: "2025-02-10",
    },
    {
      id: 3,
      titulo: "Introducción a Python para Data Science",
      categoria: "Data Science",
      nivel: "Principiante",
      instructor: "Carlos Rodríguez",
      duracion: "25 horas",
      precio: 59.99,
      publicado: true,
      imagen:
        "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 315,
      calificacion: 4.9,
      fechaCreacion: "2025-01-28",
    },
    {
      id: 4,
      titulo: "Marketing Digital Avanzado",
      categoria: "Marketing",
      nivel: "Avanzado",
      instructor: "Ana Martínez",
      duracion: "18 horas",
      precio: 44.99,
      publicado: false,
      imagen:
        "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 0,
      calificacion: 0,
      fechaCreacion: "2025-03-05",
    },
    {
      id: 5,
      titulo: "Next.js y Tailwind CSS: Desarrollo web moderno",
      categoria: "Programación",
      nivel: "Intermedio",
      instructor: "Juan Pérez",
      duracion: "22 horas",
      precio: 54.99,
      publicado: false,
      imagen:
        "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 0,
      calificacion: 0,
      fechaCreacion: "2025-03-10",
    },
  ];
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [orderBy, setOrderBy] = useState("fechaCreacion");
  const [orderDirection, setOrderDirection] = useState("desc");

  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await ViewCourseData.View();
        setCursos(data);
      } catch (err) {
        // setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        // setLoading(false);
      }
    };

    fetchCursos();
  }, []);
  const handleSort = (campo: React.SetStateAction<string>) => {
    if (orderBy === campo) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(campo);
      setOrderDirection("asc");
    }
  };

  const getSortIndicator = (campo: string) => {
    if (orderBy !== campo) return null;

    return orderDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Administración de Cursos
          </h1>
          <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Plus className="mr-2 h-5 w-5" />
            Nuevo Curso
          </button>
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
              />
            </div>

            <button
              onClick={() => setFiltroActivo(!filtroActivo)}
              className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
            >
              <Filter className="mr-2 h-5 w-5 text-gray-500" />
              Filtros
              {filtroActivo ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </button>
          </div>

          {filtroActivo && (
            <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                  <option value="">Todas las categorías</option>
                  <option value="programacion">Programación</option>
                  <option value="diseno">Diseño</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nivel
                </label>
                <select className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                  <option value="">Todos los niveles</option>
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                  <option value="">Todos</option>
                  <option value="publicado">Publicado</option>
                  <option value="borrador">Borrador</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="min-w-full divide-y divide-gray-200">
              <div className="grid grid-cols-4 bg-gray-50 px-6 py-3">
                <div className="text-left text-xs font-medium uppercase tracking-wider text-gray-500 col-span-2">
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() => handleSort("titulo")}
                  >
                    Curso
                    {getSortIndicator("titulo")}
                  </div>
                </div>
                <div className="text-left text-xs font-medium uppercase tracking-wider text-gray-500 col-start-3">
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() => handleSort("categoria")}
                  >
                    Nomenclatura
                    {getSortIndicator("categoria")}
                  </div>
                </div>
                <div className="text-left text-xs font-medium uppercase tracking-wider text-gray-500 col-start-4 row-start-1">
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() => handleSort("instructor")}
                  >
                    Estado
                    {getSortIndicator("instructor")}
                  </div>
                </div>

                <div className="text-right text-xs font-medium uppercase tracking-wider text-gray-500  col-start-5">
                  Acciones
                </div>
              </div>

              {/* Table Body */}
              {curso.map((curso) => (
                <div key={curso.id} className="divide-y divide-gray-200">
                  {/* Course Main Row */}
                  <div className="grid grid-cols-4  items-center px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center col-span-2">
                      <button
                        onClick={() => toggleCourseDetails(curso.id)}
                        className="mr-2 text-gray-500 hover:text-gray-700"
                      >
                        {openCourseId === curso.id ? (
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
                          {curso.curso}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-900 col-start-3">
                      {curso.nomenclatura}
                    </div>
                    <div className="col-start-4 row-start-1">
                      {curso.estado === "Activo" ?  (
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold leading-5 text-green-800">
                          Publicado
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold leading-5 text-yellow-800">
                          Desactivado
                        </span>
                      )}
                    </div>
                    <div className=" col-start-5 flex items-center justify-end gap-2 ">
                      <Modalcont
                        Data={[]}
                        btn={
                          <button className="text-green-600 hover:text-green-900">
                            <FaPlusCircle className="h-5 w-5" />
                          </button>
                        }
                      />
                      <ModalEdit
                        Data={[]}
                        btn={
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-5 w-5" />
                          </button>
                        }
                      />
                      <button onClick={handleEliminar} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Details Row */}
                  {openCourseId === curso.id && (
                    <div className="bg-gray-50 px-6 py-4">
                      <div className="mx-auto grid grid-cols-5 items-center justify-center gap-4 text-sm">
                        <div className="col-span-2 rounded-xl bg-blue-300 p-3">
                          <p className="font-medium text-gray-700">
                            Flujo Asignado:
                          </p>
                          <div className="text-gray-500">
                           {curso.flowNombre}
                          </div>
                        </div>
                        <div className="col-span-2 col-start-3 rounded-xl bg-blue-300 p-3">
                          <p className="font-medium text-gray-700">
                            Template asignado:
                          </p>
                          <p className="text-gray-500">{curso.templateNombre}</p>
                        </div>
                        <div className="col-start-5">
                          <p className="text-sm mb-1 font-bold text-gray-700">Bots Asignados:</p>
                          <AvatarGroup isBordered size="sm">
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                          </AvatarGroup>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {/* <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">12</span> cursos
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Anterior</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">1</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Siguiente</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminCursos;
