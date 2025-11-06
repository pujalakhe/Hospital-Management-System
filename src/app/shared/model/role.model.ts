export interface Role {
  key: number;
  value: string;
}

export interface RoleResponse {
  result: number;
  message: string;
  data: Role[];
}
