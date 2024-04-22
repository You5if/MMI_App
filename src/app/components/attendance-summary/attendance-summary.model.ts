export interface AttendanceSummaryModel  {
    empAttActId: number
    empId: number
    month: number
    year: number
    attDate: any
    present: boolean
    hrsWorked: number
    overtimeElig: number
    isWorkDay: boolean
    onLeave: boolean
    leaveType: number
    remarks: string
    isTest: boolean
    active: boolean
    userCR: number
    company: number
    roleCR: number
    browser: string
    device: string
    resol: string
    transId: number
    totalPages: number
    totalRecords: number
  }
  
    
  
    export interface AttendanceSummaryToSendModel {
        EmpAttActId: number
        EmpId: number
        Month: number
        Year: number
        AttDate: any
        Present: boolean
        HrsWorked: number
        OvertimeElig: number
        IsWorkDay: boolean
        OnLeave: boolean
        LeaveType: number
        Remarks: string
        IsTest: boolean
        Active: boolean
        Deleted: boolean
        UserCR: number
        Company: number
        RoleCR: number
        DateCR: string
        Browser: string
        Device: string
        Resol: string
        TransId: number
      }