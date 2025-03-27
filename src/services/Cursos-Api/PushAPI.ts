import { Course, ICurso } from '@/types/apiResponseCurso';

const API_URL = 'http://localhost:8000'; // Ajusta la URL base


 // Send the data
export const CursoService = {
  // Enviar datos del formulario al backend usando fetch
  async createCurso(formData: any) {
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
};

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

// view Data



export const ViewCurso = {
    async View():Promise<ICurso[]>{
    try {

            const response = await fetch(`${API_URL}/api/storage/curso`, {
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
                console.log('Datos recibidos del backend:', cursos);
                
                return cursos;
        
    } catch (error: any) {
        console.error('Error en getCursos:', error);
        throw error; // Permite manejar el error en el componente
      }

}
}
export const ViewCourseData = {
    async View():Promise<Course[]>{
    try {

            const response = await fetch(`${API_URL}/api/storage/course`, {
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
                console.log('Datos recibidos del backend:', cursos);
                
                return cursos;
        
    } catch (error: any) {
        console.error('Error en getCursos:', error);
        throw error; // Permite manejar el error en el componente
      }

}
}