import { Bots, ApiResponsebots, ApiResponse, Flow } from "@/types/flows";



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.220:8000';

export const searchBots = async (searchTerm: string = ''): Promise<Bots[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bots/search?imagebot=asignacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: searchTerm }),
    });
    
    if (!response.ok) {
      throw new Error('Error en la respuesta de la red');
    }
    
    const data: ApiResponsebots = await response.json();
    return data.bots || [];
  } catch (error) {
    console.error('Error al buscar bots:', error);
    return [];
  }
};


export const searchFlows = async (searchTerm: string = '', masivos: boolean = false): Promise<Flow[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flows/search?masivos=false`, {
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

