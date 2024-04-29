export interface PurchaseModel {
    purInvId: number
    invCode: string
    invDate: any
    supplierId: number
    remarks: string
    warehouseId: number
    tax: number
    description: string
    isTaxable: boolean
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
  
export interface PurchaseToReqModel {
    PurInvId: number
    InvCode: string
    InvDate: any
    SupplierId: number
    Remarks: string
    WarehouseId: number
    Tax: number
    Description: string
    IsTaxable: boolean
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