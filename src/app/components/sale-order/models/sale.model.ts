export interface SaleModel {
    salInvId: number
    invCode: string
    invDate: any
    customerId: number
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
  
export interface SaleToReqModel {
    SalInvId: number
    InvCode: string
    InvDate: any
    CustomerId: number
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