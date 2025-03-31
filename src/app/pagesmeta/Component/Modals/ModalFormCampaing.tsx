import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode, useState } from "react";
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
  const [formData, setFormData] = useState({
    nombreCampana: "",
    idFormulario: "",
  });

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

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

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Abrir modal para editar
  const handleEdit = (curso: Curso) => {
    setSelectedCurso(curso);
    setFormData({
      nombreCampana: curso.nombreCampana,
      idFormulario: curso.idFormulario,
    });
    setIsModalOpen(true);
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!formData.nombreCampana.trim() || !formData.idFormulario.trim()) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (selectedCurso) {
      // Actualizar curso existente
      const updatedCursos = cursos.map((curso) =>
        curso.id === selectedCurso.id
          ? {
              ...curso,
              nombreCampana: formData.nombreCampana,
              idFormulario: formData.idFormulario,
            }
          : curso,
      );
      setCursos(updatedCursos);
    }

    // Cerrar modal y resetear formulario
    setIsModalOpen(false);
    setSelectedCurso(null);
    setFormData({
      nombreCampana: "",
      idFormulario: "",
    });
  };

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
      <div onClick={onOpen}>{Content} </div>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <></>
                <div>
                  <div className="flex size-full flex-col gap-6 px-4 py-10">
                    <h1 className="text-3xl">
                      <b>PAGINA:</b> {Campaing}
                    </h1>

                    <form action="">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                          <label htmlFor="">Nombre De campaña:</label>
                          <input
                            type="text"
                            className="rounded-xl border-2 p-2"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="">ID De Formulario:</label>
                          <input
                            type="text"
                            className="rounded-xl border-2 p-2"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {/* Cabecera de la tabla */}
                    <div className="border-b border-gray-200 p-4 dark:border-gray-700 md:p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                              placeholder="Buscar Formulario"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>

                          {/* Filtro de Estado */}
                          <div className="relative inline-block">
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
                          </div>
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
                          {paginatedCursos.length > 0 ? (
                            paginatedCursos.map((curso) => (
                              <tr
                                key={curso.id}
                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                              >
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                  #{curso.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                  {curso.nombreCampana}
                                </td>
                                <td className="px-6 py-4">
                                  {curso.idFormulario}
                                </td>
                                <td className="px-6 py-4">
                                  {curso.fechaCreacion}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      curso.estado === "Activo"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                        : curso.estado === "Inactivo"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    }`}
                                  >
                                    {curso.estado}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                      onClick={() => handleEdit(curso)}
                                    >
                                      <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                      onClick={() => handleDelete(curso.id)}
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

                    {/* Paginación */}
                    {filteredAndSortedCursos.length > 0 && (
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
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages),
                              )
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
                                  setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1),
                                  )
                                }
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                              >
                                <span className="sr-only">Anterior</span>
                                <ChevronLeft className="h-5 w-5" />
                              </button>

                              {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
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
                                },
                              )}

                              <button
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages),
                                  )
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
                    )}
                  </div>

                  {/* Modal para editar curso */}
                  {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        {/* Overlay */}
                        <div
                          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                          onClick={() => setIsModalOpen(false)}
                        ></div>

                        {/* Modal */}
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              PAGINA: Cursos de Programación Avanzada
                            </h3>
                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>

                          <form onSubmit={handleSubmit}>
                            <div className="px-6 py-4">
                              <div className="mb-4">
                                <label
                                  htmlFor="nombreCampana"
                                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  Nombre De campaña:
                                </label>
                                <input
                                  type="text"
                                  id="nombreCampana"
                                  name="nombreCampana"
                                  value={formData.nombreCampana}
                                  onChange={handleInputChange}
                                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                  required
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="idFormulario"
                                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  ID De Formulario:
                                </label>
                                <input
                                  type="text"
                                  id="idFormulario"
                                  name="idFormulario"
                                  value={formData.idFormulario}
                                  onChange={handleInputChange}
                                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                  required
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="level"
                                  className="mb-1 block text-sm font-medium text-gray-700"
                                >
                                  Curso
                                </label>
                                <select
                                  id="level"
                                //   value=""
                                //   onChange=""
                                  className="w-full rounded-md border bg-gray-50 border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option>Panederia nuclear</option>
                                  <option >Crianza bot</option>
                                  <option>Tejedurias de fierro</option>
                                </select>
                              </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 text-right dark:bg-gray-700">
                              <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Guardar
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
