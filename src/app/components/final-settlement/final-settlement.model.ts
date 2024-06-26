export interface FinalSettleModel  {
    finalSettleId: number
    empId: number
    finalDate: any
    description: string
    gratuityClear: boolean
    leaveClear: boolean
    salaryClear: boolean
    invClear: boolean
    handoverCl: boolean
    supervisorCl: boolean
    managerCl: boolean
    loanClear: boolean
    handedTo: number
    remarks: string
    witness1: number
    witness2: number
    attachments: string
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
  
    
  
    export interface FinalSettleToSendModel {
        FinalSettleId: number
        EmpId: number
        FinalDate: any
        Description: string
        GratuityClear: boolean
        LeaveClear: boolean
        SalaryClear: boolean
        InvClear: boolean
        HandoverCl: boolean
        SupervisorCl: boolean
        ManagerCl: boolean
        LoanClear: boolean
        HandedTo: number
        Remarks: string
        Witness1: number
        Witness2: number
        Attachments: string
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
      