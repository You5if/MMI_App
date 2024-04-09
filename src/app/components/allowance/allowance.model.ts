export interface AllowanceModel  {
    allowanceId: number
    allowName: string
    allowType: number
    allowFormula: string
    runFreq: number
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
  

  export interface AllowanceToSendModel {
    AllowanceId: number
    AllowName: string
    AllowType: number
    AllowFormula: string
    RunFreq: number
    AllowParam: string
    AllowParamType: string
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