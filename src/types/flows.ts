
  export interface Bots {
    id: number;
    name: string;
    botId: number;
    botNombre: string;
  }
  
  export interface IBot {
    id: number;
    name: string;
    botNombre?:string
    // Add any other properties your bot might have
  }
  
  export interface ApiResponsebots {
    bots: Bots[];
  }
  

  export interface Flow {
    id: number;
    name: string;
  }
 
  
  export interface ApiResponse {
    flows: Flow[];
  }