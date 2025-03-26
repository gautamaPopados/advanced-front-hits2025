
  
export type QueryParam = {
    key: string;
    value: string;
  };


interface ResponseError extends Error {
  status?: number;
}


  export type FindAllUsersResponse = { results: User[]; total: number };