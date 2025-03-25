// src/types/flows.ts
export interface Mensaje {
    id: string;
    tipo: string;
    content: {
      body: string;
      footer: string;
    };
  }
  
  export  interface Bots {
    id: number;
    name: string;
  }
  
  export interface ApiResponsebots {
    bots: Bots[];
  }
  

  export interface Flow {
    id: number;
    name: string;
    mensajes: Mensaje[];
  }
 
  
  export interface ApiResponse {
    flows: Flow[];
  }