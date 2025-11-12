import { TableColumn } from "../../../../shared/model/table-column.model";

export type ColumnType = 'text' | 'custom' | 'action' | undefined;

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

export const AttendanceTableColumns: TableColumn<AttendanceItem>[] = [
  { field: 'id', header: 'ID', sortable: true, filterable: true},
  { field: 'employeeName', header: 'Employee', sortable: true, filterable: true },
  { field: 'departmentName', header: 'Department', sortable: true, filterable: true },
  { field: 'date', header: 'Date', sortable: true, filterable: true },
  { field: 'checkIn', header: 'Check In', sortable: true },
  { field: 'checkOut', header: 'Check Out', sortable: true },
  { field: 'totalHours', header: 'Hours', sortable: true },
  { field: 'status', header: 'Status', sortable: true, filterable: true },
  { field: 'actions', header: 'Actions', type: 'action' as ColumnType }
];

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
