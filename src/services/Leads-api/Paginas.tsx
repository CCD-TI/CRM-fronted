import { paginas } from "@/types/leads/paginas";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL  || "https://crm.paulyeffertperezsanjinez.link/"; // Ajusta la URL base

//search data

export const PaginasView = {
    // Enviar datos del formulario al backend usando fetch
    async ViewData(Params: string): Promise<paginas[]> {
      try {
        const encondeparam = encodeURIComponent(Params);
        const response = await fetch(
          `${API_URL}/api/leads-service/pagina/search?q=${encondeparam}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        
        // Si la respuesta es 404 (no encontrado), devolver array vacío
        if (response.status === 404) {
          return [];
        }
        
        // Verificar otros códigos de error
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          // Si el mensaje de error indica búsqueda sin resultados, devolver array vacío
          if (errorData.message && 
              (errorData.message.includes("búsqueda") || 
               errorData.message.includes("No se encontraron"))) {
            return [];
          }
          
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error("Error al Traer la data", error);
        
        // Si el error específico es relacionado con la búsqueda, devolver array vacío
        if (error instanceof Error && 
            (error.message.includes("búsqueda") || 
             error.message.includes("Error al realizar"))) {
          return [];
        }
        
        throw error;
      }
    },
  };

export const PaginasCreate = {

    async createPaginas(formData: any) {
        try {
            const response = await fetch(`${API_URL}/api/leads-service/pagina`, {
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
            console.error('Error al crear pagina:', error);
            throw error;
        }
    }

}

export const PaginasUpdate = {

    async Update(formData: any,id: number) {
        try {
            const response = await fetch(`${API_URL}/api/leads-service/pagina/${id}`, {
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
            console.error('Error al crear pagina:', error);
            throw error;
        }
    }

}

export const PaginasDelete = {
    async deletePaginas(id: number) {

        try {
            const response = await fetch(`${API_URL}/api/leads-service/pagina/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json'
                }
            });

            // Verificar si la respuesta fue exitosa (status 200-299)
            if (!response.ok) {
                // Intentar parsear el mensaje de error del backend
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al eliminar pagina:', error);
            throw error;
        }
    }
}