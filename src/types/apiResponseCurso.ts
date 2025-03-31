// types/curso.ts
export interface ICurso {
    id: number;
    nombre: string;
    Nomenclatura: string;
    status: number;
    flowId: number;
    flowNombre: string;
    templateNombre: string;
    bots: Array<{ id: number; nombre: string }>; // Cambiado de `[]` a este tipo
    createdAt: string;
    updatedAt: string;
}