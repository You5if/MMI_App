export interface ChartOfAccountsModel  {
    accountId: number
  accCode: string
  accName: string
  accCategory: string
  parentAccId: number
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
  
    
  
    export interface ChartOfAccountsSendModel {
        AccountId: number
  AccCode: string
  AccName: string
  AccCategory: string
  ParentAccId: number
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