export type ColumnType = 'text' | 'custom' | 'action' | undefined;

export interface AttendanceTableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ value: any; label: string }>;
  filterEndpoint?: string;
  type?: ColumnType;
}

export interface AttendanceItem {
  id: number;
  employeeId: string;
  employeeName: string;
  departmentId: number;
  departmentName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
  totalHours?: number;
  workLocation: number;
  notes?: string;
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  HalfDay = 'Half Day'
}

export interface AttendanceListRequest {
  departmentId?: number;
  employeeId?: number;
  startDate?: string;
  endDate?: string;
  workLocation?: number;
  skip: number;
  take: number;
  sort?: {
    key: string;
    sortBy: string;
  };
}

export interface AttendanceListResponse {
  result: number;
  message: string;
  data: {
    count: number;
    take: number;
    skip: number;
    data: AttendanceItem[];
  };
}
