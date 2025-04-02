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
  // Enviar datos del formulario al backend usando fetch
  async ViewData(Params: string , id: number):Promise<campanas[]> {
    try {
      const encondeparam = encodeURIComponent(Params);
      const idPagina = Number(id)
      const response = await fetch(
        `${API_URL}/api/leads-service/campana/${idPagina}/search?q=${encondeparam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Verificar si la respuesta fue exitosa (status 200-299)
      if (!response.ok) {
        // Intentar parsear el mensaje de error del backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al Traer la data", error);
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