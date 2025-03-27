// types/curso.ts
export interface ICurso {
    id: number;
    nombre: string;
    flowId: number;
    flowNombre: string;
    templateNombre: string;
    createdAt: string;
    updatedAt: string;
  }


  export interface Course {
    id: number;
    curso: string;
    nomenclatura: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
  }