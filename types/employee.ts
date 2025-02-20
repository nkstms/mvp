export interface Employee {
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: number;
}

export type SortField = keyof Employee;
export type SortDirection = 'asc' | 'desc';
