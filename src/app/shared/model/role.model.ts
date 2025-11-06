export interface Role {
  id: number;
  name: string;
}

export interface RoleResponse {
  result: number;
  message: string;
  data: Role[];
}
