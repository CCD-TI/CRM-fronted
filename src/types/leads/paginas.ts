export interface paginas {
    id: number;
    name: string;
    RedPaginaId: number;
    status: number;
    createdAt: Date;
   
}

export interface campanas {
    id: number;
    name: string;
    RedCampanaId: number;
    paginaId: number;
    status: number;
    createdAt: Date;
   
}

export interface Formulario {
    name: string;
    RedFormularioId: string;
    cursoId: number;
    status: number;
    id: number;
    campanaId:number;
    botId: number,
    botName: string,
    createdAt: Date;
    updatedAt:Date
    
}

