export interface LeaveBalanceModel  {
    leaveBalId: number
    empAgreementId: number
    leaveId: number
    allocated: string
    taken: number
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
  
    
  
    export interface LeaveBalanceToSendModel {
        LeaveBalId: number
        EmpAgreementId: number
      LeaveId: number
      Allocated: number
      Taken: number
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