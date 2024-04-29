export interface StockMoveModel {
    stockMoveId: number
    moveDate: any
    moveCode: string
    fromWarehouse: number
    toWarehouse: number
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
  
export interface StockMoveToReqModel {
    StockMoveId: number
    MoveDate: any
    MoveCode: string
    FromWarehouse: number
    ToWarehouse: number
    Remarks: string
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