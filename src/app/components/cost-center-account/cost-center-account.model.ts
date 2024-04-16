export interface CostCenterAccModel  {
    costCenAccId: number
    accountId: number
    costCenId: number
    description: string
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
  

  export interface CostCenterAccToSendModel {
    CostCenAccId: number
    AccountId: number
    CostCenId: number
    Description: string
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