export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Half Day';

export enum WorkLocation {
  OFFICE = 1,
  REMOTE = 2
}

export interface AttendanceDetail {
  employeeId: number;
  employeeName: string;
  departmentName: string;
  date: string | Date;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  totalHours?: number;
  workLocation: number;
  notes?: string;
}

export interface AttendanceDetailRequest {
  employeeId: number;
}


export interface AttendanceDetailItem {
  id: number;
  employeeId: string;
  employeeName?: string;        
  departmentName?: string;      
  checkInDate: string;
  checkOutDate: string;
  workingHour: number;
  workLocation: number;
  notes?: string;               
}

export interface AttendanceResponse {
  result: string;
  message: string;
  data: {
    employeeId: number;
    employeeName: string;
    departmentName: string;
    checkIn: string;
    checkInReason: string;
    checkOut: string;
    checkOutReason: string;
    workingHour: number;
    workLocation: number;
  };
}