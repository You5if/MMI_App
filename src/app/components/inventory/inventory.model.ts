export interface InventoryModel  {
    empInvListId: number
    itemName: string
    description: string
    itemType: number
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
  

  export interface InventoryToSendModel {
    EmpInvListId: number
    ItemName: string
    Description: string
    ItemType: number
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
  