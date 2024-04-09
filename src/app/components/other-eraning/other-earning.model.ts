export interface EarnModel  {
    earnAllowId: number
    employees: string
    month: number
    year: number
    amount: number
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
  
    
  
    export interface EarnToSendModel {
        EarnAllowId: number
        Employees: string
        Month: number
        Year: number
        Amount: number
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