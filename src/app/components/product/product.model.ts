export interface ProductModel  {
    productId: number
    prodName: string
    prodDesc: string
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
  

  export interface ProductToSendModel {
    ProductId: number
    ProdName: string
    ProdDesc: string
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