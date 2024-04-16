export interface CostCenterModel  {
    costCenId: number
    centerName: string
    description: string
    costCenGrId: number
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
  

  export interface CostCenterToSendModel {
    CostCenId: number
    CenterName: string
    Description: string
    CostCenGrId: number
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