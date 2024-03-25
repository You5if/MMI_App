export interface UsersModel {
    appUserId: number
    appUserName: string
    displayName: string
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

export interface UsersToSendModel {
    AppUserName: string
  DisplayName: string
  Password: string
  IsTest: boolean
  Active: boolean
  Company: number
  RoleCR: number
  Browser: string
  Device: string
  Resol: string
  TransId: number
  UserId: number
  }
export interface UsersToDeleteModel {
    AppUserId: number
  IsTest: boolean
  Active: boolean
  Company: number
  RoleCR: number
  Browser: string
  Device: string
  Resol: string
  TransId: number
  UserId: number
  }