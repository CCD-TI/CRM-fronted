import { Bots, ApiResponsebots, ApiResponse, Flow } from "@/types/flows";



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const searchBots = async (searchTerm: string = ''): Promise<Bots[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/masivo/bots/search?imagebot=bot-crm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Agrega estas cabeceras para CORS
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ search: searchTerm }),
      // Configuración adicional para CORS
      mode: 'cors', // o 'no-cors' si el servidor no soporta CORS
      credentials: 'same-origin' // o 'include' si necesitas enviar cookies
    });

    // Verificar si la respuesta es OK (2xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la respuesta de la red');
    }

    // Verificar el tipo de contenido de la respuesta
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Respuesta no es JSON');
    }

    const data: ApiResponsebots = await response.json();
    return data.bots || [];
  } catch (error) {
    console.error('Error al buscar bots:', error);
    // Puedes agregar aquí un manejo más específico de errores
    return [];
  }
};

export const searchFlows = async (searchTerm: string = '', masivos: boolean = false): Promise<Flow[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/masivo/flows/search?masivos=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: searchTerm }),
    });
    
    if (!response.ok) throw new Error('Error en la respuesta de la red');
    
    const data: ApiResponse = await response.json();
    return data.flows || [];
  } catch (error) {
    console.error('Error al buscar flows:', error);
    return [];
  }
};

