export interface IncidentModel  {
    empIncidentId: number
    empId: number
    incDate: string
    description: string
    remarks: string
    witness1: number
    witness2: number
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
  
    
  
    export interface incidentToSendModel {
        EmpIncidentId: number
        EmpId: number
        IncDate: string
        Description: string
        Remarks: string
        Witness1: number
        Witness2: number
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