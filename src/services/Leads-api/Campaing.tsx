import { campanas } from "@/types/leads/paginas";

const API_URL = "http://localhost:8000"; // Ajusta la URL base



// Create a new campaings 

export const CampaingCreate = {
  async create(formData: any) {
    try {
      const response = await fetch(`${API_URL}/api/leads-service/campana/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Verificar si la respuesta fue exitosa (status 200-299)
      if (!response.ok) {
        // Intentar parsear el mensaje de error del backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al crear campaing:", error);
      throw error;
    }
  },
};
export const CampaingUpdate = {
  async Update(formData: any ,id:number) {
    try {
      const response = await fetch(`${API_URL}/campana/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Verificar si la respuesta fue exitosa (status 200-299)
      if (!response.ok) {
        // Intentar parsear el mensaje de error del backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al ACtualizar  campaing:", error);
      throw error;
    }
  },
};

export const CampaingView = {
  async ViewData(Params: string, id: number): Promise<campanas[]> {
    try {
      const encondeparam = encodeURIComponent(Params);
      const idPagina = Number(id);
      const response = await fetch(
        `${API_URL}/api/leads-service/campana/${idPagina}/search?q=${encondeparam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      
      // Si la respuesta es 404 (no encontrado) o similar, simplemente devolver un array vacío
      if (response.status === 404) {
        return [];
      }
      
      // Verificar otros códigos de error
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Si el mensaje de error indica búsqueda sin resultados, devolver array vacío
        if (errorData.message && errorData.message.includes("búsqueda")) {
          return [];
        }
        
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error al Traer la data", error);
      
      // Si el error específico es "Error al realizar la búsqueda", devolver array vacío
      if (error instanceof Error && 
          (error.message.includes("búsqueda") || 
           error.message.includes("Error al realizar"))) {
        return [];
      }
      
      throw error;
    }
  },
};
export const CampaingDelete = {
    async delete(id: number) {

        try {
            const response = await fetch(`${API_URL}/campana/${id}`, {
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