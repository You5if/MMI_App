export interface SupplierModel  {
    supplierId: number
    suppName: string
    address: string
    contactPer: string
    email: string
    phone: number
    phone2: number
    accountId: number
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
  

  export interface SupplierToSendModel {
    SupplierId: number
    SuppName: string
    Address: string
    ContactPer: string
    Email: string
    Phone: number
    Phone2: number
    AccountId: number
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