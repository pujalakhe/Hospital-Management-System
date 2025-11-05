export interface Department {
  id: number;
  name: string;
}

export interface DepartmentResponse {
  result: number;
  message: string;
  data: Department[];
}
