import { Bots } from "@/types/flows";
import { Formulario } from "@/types/leads/paginas";


const API_URL = "http://localhost:8003"; // Ajusta la URL base

export const FormCreate = {
  async create(formData: any) {
    try {
      const response = await fetch(`${API_URL}/formulario`, {
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
      const response = await fetch(`${API_URL}/formulario`, {
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
    async View(Params: string): Promise<Formulario[]> {
      try { 
        const encondeparam = encodeURIComponent(Params);
        const response = await fetch(`${API_URL}/formulario/search?q=${Params}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ search: searchTerm }),
        });
  
        // Verificar si la respuesta fue exitos a (status 200-299)
        if (!response.ok) {
          // Intentar parsear el mensaje de error del backend
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error("Error al buscar campaña:", error);
        throw error;
      }
    },
  };
          
export const DeleteCourse = {
    async delete(id: number ): Promise<Bots[]> {
      try { 
        const response = await fetch(`${API_URL}/formulario/${id}`, {
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




  