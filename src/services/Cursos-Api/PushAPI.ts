import { ICurso } from '@/types/apiResponseCurso';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL  || "https://crm.paulyeffertperezsanjinez.link/"; // Ajusta la URL base


 // Send the data
export const CursoService = {
  // Enviar datos del formulario al backend usando fetch
  async createCurso(formData: any , id:number) {
    try {
      const response = await fetch(`${API_URL}/api/storage/curso/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Verificar si la respuesta fue exitosa (status 200-299)
      if (!response.ok) {
        // Intentar parsear el mensaje de error del backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear curso:', error);
      throw error;
    }
  }
};

export const CreateCurso ={
  async create(formData: any) {
    try {
      const response = await fetch(`${API_URL}/api/storage/curso`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Verificar si la respuesta fue exitosa (status 200-299)
      if (!response.ok) {
        // Intentar parsear el mensaje de error del backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear curso:', error);
      throw error;
    }
  }
}

export const BotService = {
  // Enviar datos del formulario al backend usando fetch
  async createCurso(formData: any) {
    try {
      const response = await fetch(`${API_URL}/api/storage/bot-curso`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      const data: ICurso = await response.json();
      return data; // Devuelve los datos tipados como ICurso
      
    } catch (error) {
      console.error('Error en CursoService.createCurso:', error);
      throw error; // Relanza el error para manejarlo en el componente
    }
  }
};


// searh data
export const SearchCurso = {
  async Search(param:string):Promise<ICurso[]>{
  try {
        const encondeparam = encodeURIComponent(param); // Codifica el parámetro de búsqueda
          const response = await fetch(`${API_URL}/api/storage/curso/search?q=${encondeparam}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
      
            const cursos = await response.json();
            console.log('Datos recibidos:', cursos); // Debug
            return cursos;
            
          } catch (error: any) {
            console.error('Error en search:', error);
            throw new Error(error.message || 'Error al buscar cursos');
          }
        }
}

// view Data



export const ViewCursos = {
    async View(id:number):Promise<ICurso[]>{
    try {

            const response = await fetch(`${API_URL}/api/storage/curso/${id}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json'
                }
              });

              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al obtener cursos');
              }
        
                const cursos = await response.json();
      
                // 👇 Console.log para ver los datos recibidos
                
                return cursos;
        
    } catch (error: any) {
        console.error('Error en getCursos:', error);
        throw error; // Permite manejar el error en el componente
      }

}
}
export const ViewCursoId = {
    async VieId(id: number): Promise<ICurso> {
      // 👇 Validación del ID (debe ser un número positivo)
      if (!id || typeof id !== 'number' || id <= 0) {
        throw new Error('ID de curso no válido. Debe ser un número mayor a 0.');
      }
  
      try {
        const response = await fetch(`${API_URL}/api/storage/curso/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Error al obtener el curso');
        }
  
        const cursos = await response.json();
        // console.log('Datos recibidos del backend:', cursos);
        
        return cursos;
      } catch (error: any) {
        console.error('Error en ViewCursoId.View:', error);
        throw error; // Re-lanzamos el error para manejarlo en el componente
      }
    },
  };



// delete data

export const deletebot = {
    // Enviar datos del formulario al backend usando fetch
    async EliminarBot( id:number) {
      try {
        const response = await fetch(`${API_URL}/api/storage/bot-curso/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
          
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }
  
        const data: ICurso = await response.json();
        return data; // Devuelve los datos tipados como ICurso
        
      } catch (error) {
        console.error('Error en CursoService.createCurso:', error);
        throw error; // Relanza el error para manejarlo en el componente
      }
    }
  };

