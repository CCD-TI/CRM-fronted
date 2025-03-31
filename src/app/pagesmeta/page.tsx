"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import ModalFormCampaing from "./Component/Modals/ModalFormCampaing";
import { PaginasDelete, PaginasView } from "@/services/Leads-api/Paginas";
import { paginas } from "@/types/leads/paginas";
import Swal from "sweetalert2";
import ModalFormPagemeta from "./Component/Modals/ModalFormPagemeta";
import ModalFormPagemetaUpdate from "./Component/Modals/ModalFormPagemetaUpdate";

const USERS = [
  {
    id: 1,
    pagina: "Cursos de Programación Avanzada",
    email: "alex.johnson@example.com",
    status: "Activo",
    lastActive: "2023-03-22T10:30:00",
    transactions: 245,
    amount: 12580.5,
  },
  {
    id: 2,
    pagina: "Marketing Digital para Emprendedores",
    email: "sarah.w@example.com",
    status: "Activo",
    lastActive: "2023-03-21T14:20:00",
    transactions: 112,
    amount: 5240.75,
  },
  {
    id: 3,
    pagina: "Diseño Gráfico desde Cero",
    email: "michael.b@example.com",
    status: "Inactivo",
    lastActive: "2023-03-15T09:45:00",
    transactions: 65,
    amount: 3420.25,
  },
  {
    id: 4,
    pagina: "Negocios y Finanzas Personales",
    email: "emily.davis@example.com",
    status: "Pendiente",
    lastActive: "2023-03-20T16:15:00",
    transactions: 198,
    amount: 9870.0,
  },
  {
    id: 5,
    pagina: "Inglés para Profesionales",
    email: "david.w@example.com",
    status: "Activo",
    lastActive: "2023-03-22T08:10:00",
    transactions: 87,
    amount: 4320.5,
  },
  {
    id: 6,
    pagina: "Fotografía y Edición Profesional",
    email: "jessica.m@example.com",
    status: "Activo",
    lastActive: "2023-03-21T11:30:00",
    transactions: 156,
    amount: 7650.25,
  },
  {
    id: 7,
    pagina: "Desarrollo de Aplicaciones Móviles",
    email: "robert.t@example.com",
    status: "Inactivo",
    lastActive: "2023-03-10T13:45:00",
    transactions: 42,
    amount: 2180.75,
  },
  {
    id: 8,
    pagina: "Excel y Herramientas de Oficina",
    email: "jennifer.a@example.com",
    status: "Activo",
    lastActive: "2023-03-19T15:20:00",
    transactions: 215,
    amount: 10540.0,
  },
  {
    id: 9,
    pagina: "Redes Sociales y Community Manager",
    email: "chris.t@example.com",
    status: "Pendiente",
    lastActive: "2023-03-18T09:30:00",
    transactions: 76,
    amount: 3890.5,
  },
  {
    id: 10,
    pagina: "Cursos de Gestión de Proyectos",
    email: "lisa.r@example.com",
    status: "Activo",
    lastActive: "2023-03-22T10:15:00",
    transactions: 132,
    amount: 6540.25,
  },
  {
    id: 11,
    pagina: "Contabilidad y Finanzas Empresariales",
    email: "daniel.l@example.com",
    status: "Activo",
    lastActive: "2023-03-21T14:45:00",
    transactions: 95,
    amount: 4780.0,
  },
  {
    id: 12,
    pagina: "Educación y Docencia Online",
    email: "michelle.c@example.com",
    status: "Inactivo",
    lastActive: "2023-03-12T11:20:00",
    transactions: 178,
    amount: 8920.75,
  },
];

export default function Campañas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(2);
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 5;

  const [paginas, setpaginas] = useState<paginas[]>([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCursos = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await PaginasView.ViewData(term);
      setpaginas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al cargar cursos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Datos recibidos del backend:", paginas);
      fetchCursos(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, updateFlag]);

  const handleSearchChange = (e: { target: { value: any } }) => {
    setSearchTerm(e.target.value);
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
      await PaginasDelete.deletePaginas(Idpagina);
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

  // const filteredData = useMemo(() => {
  //   return paginas.filter((user) => {

  //     const matchesStatus =
  //       statusFilter === 2 ||
  //       user.status === Number(statusFilter);

  //     return matchesStatus;
  //   });
  // }, [searchTerm, statusFilter, roleFilter]);

  // Aplicar ordenamiento
  // const sortedData = useMemo(() => {
  //   const sorted = [...filteredData].sort((a, b) => {
  //     if (
  //       a[sortConfig.key as keyof typeof a] <
  //       b[sortConfig.key as keyof typeof b]
  //     ) {
  //       return sortConfig.direction === "asc" ? -1 : 1;
  //     }
  //     if (
  //       a[sortConfig.key as keyof typeof a] >
  //       b[sortConfig.key as keyof typeof b]
  //     ) {
  //       return sortConfig.direction === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  //   return sorted;
  // }, [filteredData, sortConfig]);

  // Paginación
  // const paginatedData = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   return sortedData.slice(startIndex, startIndex + itemsPerPage);
  // }, [sortedData, currentPage]);

  // Función para ordenar
  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Función para seleccionar/deseleccionar todas las filas
  // const toggleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(paginatedData.map((user) => user.id));
  //   }
  //   setSelectAll(!selectAll);
  // };

  // Actualizar selectAll cuando cambia la página
  // useEffect(() => {
  //   const allSelected = paginatedData.every((user) =>
  //     selectedRows.includes(user.id),
  //   );
  //   setSelectAll(allSelected && paginatedData.length > 0);
  // }, [paginatedData, selectedRows]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalUsers = paginas.length;
    const activeUsers = paginas.filter((user) => user.status === 1).length;
    const totalTransactions = USERS.reduce(
      (sum, user) => sum + user.transactions,
      0,
    );
    const totalAmount = USERS.reduce((sum, user) => sum + user.amount, 0);

    return {
      totalUsers,
      activeUsers,
      totalTransactions,
      totalAmount: totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      activePercentage: Math.round((activeUsers / totalUsers) * 100),
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Paginas
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Paginas Disponibles de CCD
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total De Paginas
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers}
              </p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Campañas Activas
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeUsers}
              </p>
            </div>
            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-green-600"
                style={{ width: `${stats.activePercentage}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {stats.activePercentage}% del total
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Dinero Invertido
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white"></p>
              S/ 10,000{" "}
            </div>
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
              <svg
                className="h-6 w-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                12.5%
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                vs mes anterior
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ingresos Totales
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalAmount}
              </p>
            </div>
            <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/30">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                8.2%
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                vs mes anterior
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Cabecera de la tabla */}
        <div className="border-b border-gray-200 p-4 dark:border-gray-700 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paginas
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
                  placeholder="Buscar Paginas..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <ModalFormPagemeta
                btnCreate={
                  <button className="rounded bg-blue-500 px-4 py-2 text-white">
                    Crear PageMeta
                  </button>
                }
                onUpdate={() => setUpdateFlag((prev) => !prev)}
              />
              {/* Filtro de Estado */}
              {/* <div className="relative inline-block">
                <select
                  className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Pendiente">Pendiente</option>
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
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Nombre
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>

                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    Fecha de creacion:
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

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginas.length === 0 && !loading ? (
                <tr className="bg-white dark:bg-gray-800">
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No se encontraron resultados
                  </td>
                </tr>
              ) : (
                paginas.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === 1
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : user.status === 0
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {user.status === 1 && (
                          <Check className="mr-1 h-3 w-3" />
                        )}
                        {user.status === 0 && <X className="mr-1 h-3 w-3" />}
                        {user.status === 1
                          ? "Activo"
                          : user.status === 0
                            ? "Inactivo"
                            : "Pendiente"}
                      </span>
                    </td>

                    <td className="z-50 px-6 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <div className="group">
                          <button className="inline-flex items-center rounded-lg bg-transparent p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                          <div className="absolute right-0 top-[10px] z-10 hidden w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:block dark:bg-gray-800">
                            <div className="py-4">
                              <div
                                className={
                                  user.status === 1
                                    ? ""
                                    : "pointer-events-none opacity-50"
                                }
                              >
                                <Link
                                  href={`/pagesmeta/campaigns?name=${user.name}&paginaId=${user.id}`}
                                  className="flex gap-2 items-center w-full  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Crear Campaña
                                </Link>
                              </div>

                              <ModalFormPagemetaUpdate
                                btnCreate={
                                  <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </button>
                                }
                                datapage={user}
                                onUpdate={() => setUpdateFlag((prev) => !prev)}
                              />
                              <button
                                onClick={() => deleteData(user.id)}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {/* <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={
                currentPage >= Math.ceil(filteredData.length / itemsPerPage)
              }
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
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </span>{" "}
                de <span className="font-medium">{filteredData.length}</span>{" "}
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

                {Array.from(
                  {
                    length: Math.min(
                      5,
                      Math.ceil(filteredData.length / itemsPerPage),
                    ),
                  },
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
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage >= Math.ceil(filteredData.length / itemsPerPage)
                  }
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Siguiente</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
