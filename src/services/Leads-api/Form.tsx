import { Bots } from "@/types/flows";
import { Formulario } from "@/types/leads/paginas";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL  || "https://crm.paulyeffertperezsanjinez.link/";

export const FormCreate = {
  async create(formData: any) {
    try {
      const response = await fetch(`${API_URL}/api/leads-service/formulario`, {
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
export const FormUpdate = {
  async update(formData: any) {
    try {
      const response = await fetch(`${API_URL}/api/leads-service/formulario`, {
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
      console.error("Error al crear campaing:", error);
      throw error;
    }
  },
};

export const ViewCourse = {
  async View(Params: string, id: number): Promise<Formulario[]> {
    try {
      const encondeparam = encodeURIComponent(Params);
      const response = await fetch(
        `${API_URL}/api/leads-service/formulario/${id}/search?q=${encondeparam}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      
      // Si la respuesta es 404 (no encontrado) o similar, simplemente devolver un array vacío
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
      console.error("Error al buscar campaña:", error);
      
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
          
export const DeleteCourse = {
    async delete(id: number ): Promise<Bots[]> {
      try { 
        const response = await fetch(`${API_URL}/api/leads-service/formulario/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
         
        });
  
        // Verificar si la respuesta fue exitos a (status 200-299)
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




  