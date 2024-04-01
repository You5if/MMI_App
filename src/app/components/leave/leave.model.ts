export interface LeaveModel  {
    leaveId: number
    leaveName: string
    description: string
    leaveFormula: string
    isPaid: boolean
    payEvalFormula: string
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
  

  export interface LeaveToSendModel {
    LeaveId: number
    LeaveName: string
    Description: string
    LeaveFormula: string
    IsPaid: boolean
    PayEvalFormula: string
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