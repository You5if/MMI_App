export interface EmpLeaveModel  {
  empLeaveId: number
  empId: number
  leaveId: number
  leaveDate: string
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

  

  export interface EmpLeaveToSendModel {
    EmpLeaveId: number
    EmpId: number
    LeaveId: number
    LeaveDate: string
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