export interface StockOutModel {
    stockOutId: number
    code: string
    stockOutDate: any
    warehouseId: number
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
  
export interface StockOutToReqModel {
    StockOutId: number
    Code: string
    StockOutDate: any
    WarehouseId: number
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