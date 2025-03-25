import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Modalcont from './Modals/Modalcont';
import { FaPlusCircle } from 'react-icons/fa';
import ModalEdit from './Modals/ModalEdit';

const AdminCursos = () => {
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
      imagen: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 230,
      calificacion: 4.8,
      fechaCreacion: "2025-01-15"
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
      imagen: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 185,
      calificacion: 4.6,
      fechaCreacion: "2025-02-10"
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
      imagen: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 315,
      calificacion: 4.9,
      fechaCreacion: "2025-01-28"
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
      imagen: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 0,
      calificacion: 0,
      fechaCreacion: "2025-03-05"
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
      imagen: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/PortadaFinal/111_DOPPC.jpg",
      estudiantes: 0,
      calificacion: 0,
      fechaCreacion: "2025-03-10"
    }
  ]
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [orderBy, setOrderBy] = useState("fechaCreacion");
  const [orderDirection, setOrderDirection] = useState("desc");
  
  const handleSort = (campo: React.SetStateAction<string>) => {
    if (orderBy === campo) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(campo);
      setOrderDirection('asc');
    }
  };
  
  const getSortIndicator = (campo: string) => {
    if (orderBy !== campo) return null;
    
    return orderDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 ml-1" /> 
      : <ChevronDown className="w-4 h-4 ml-1" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Administración de Cursos</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Curso
          </button>
        </div>
        
        {/* Filters and search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 min-w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Buscar cursos..."
              />
            </div>
            
            <button 
              onClick={() => setFiltroActivo(!filtroActivo)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 mr-2 text-gray-500" />
              Filtros
              {filtroActivo ? 
                <ChevronUp className="ml-2 w-4 h-4" /> : 
                <ChevronDown className="ml-2 w-4 h-4" />
              }
            </button>
          </div>
          
          {filtroActivo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">Todas las categorías</option>
                  <option value="programacion">Programación</option>
                  <option value="diseno">Diseño</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">Todos los niveles</option>
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">Todos</option>
                  <option value="publicado">Publicado</option>
                  <option value="borrador">Borrador</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort('titulo')}
                    >
                      Curso
                      {getSortIndicator('titulo')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort('categoria')}
                    >
                      Categoría
                      {getSortIndicator('categoria')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort('instructor')}
                    >
                      Instructor
                      {getSortIndicator('instructor')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort('precio')}
                    >
                      Precio
                      {getSortIndicator('precio')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort('estudiantes')}
                    >
                      Estudiantes
                      {getSortIndicator('estudiantes')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Estado
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cursos.map((curso) => (
                  <tr key={curso.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                          <img src={curso.imagen} alt={curso.titulo} className="h-10 w-10 object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{curso.titulo}</div>
                          <div className="text-sm text-gray-500">{curso.nivel} • {curso.duracion}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{curso.categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{curso.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${curso.precio.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{curso.estudiantes}</div>
                      {curso.calificacion > 0 && (
                        <div className="text-sm text-gray-500">
                          ★ {curso.calificacion.toFixed(1)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {curso.publicado ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Publicado
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Borrador
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        {/* <button className="text-indigo-600 hover:text-indigo-900">
                          <Eye className="w-5 h-5" />
                        </button> */}
                       < Modalcont
                       
                      Data={[]}
                       
                       btn={
                        <button className="text-green-600 hover:text-green-900">
                          <FaPlusCircle  className="w-5 h-5" />
                        </button>

                       } />
                       < ModalEdit
                       
                      Data={[]}
                       
                       btn={
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-5 h-5" />
                        </button>

                       } />
                     
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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