import { filter } from "rxjs";
import { AttendanceStatus } from "../attendance/models/attendance.model";

export const AttendanceListColumns = [
  { field: 'employeeId', header: 'Employee ID', sortable: true },
     { field: 'employeeName', header: 'Employee Name', sortable: true },
     { field: 'departmentName', header: 'Department', sortable: true, filterable: true},
     { field: 'date', header: 'Date', sortable: true },
     { field: 'checkIn', header: 'Check In', sortable: true },
     { field: 'checkOut', header: 'Check Out', sortable: true },
     { 
       field: 'status', 
       header: 'Status', 
       sortable: true,
       filterable: true,
       filterOptions: [
         { value: AttendanceStatus.Present, label: 'Present' },
         { value: AttendanceStatus.Absent, label: 'Absent' },
         { value: AttendanceStatus.Late, label: 'Late' },
         { value: AttendanceStatus.HalfDay, label: 'Half Day' }
       ]
     },
     { field: 'totalHours', header: 'Total Hours', sortable: true, filterable: true },
     { field: 'notes', header: 'Notes' },
     { field: 'actions', header: 'Actions', type: 'action' }
  ];