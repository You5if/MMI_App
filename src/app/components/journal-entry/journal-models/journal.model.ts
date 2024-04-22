export interface JournalModel {
    journEntryId: number
    journCode: string
    journDate: any
    costCenId: number
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
  
export interface JournalToReqModel {
        JournEntryId: number
        JournCode: string
        JournDate: any
        CostCenId: number
        IsTest: boolean
        Active: boolean
        UserCR: number
        Company: number
        RoleCR: number
        Browser: string
        Device: string
        Resol: string
        TransId: number
  }
  