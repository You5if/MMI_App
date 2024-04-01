export interface AgreementModel {
    empAgreementId: number
    empId: number
    agStart: string
    agEnd: string
    department: string
    jobTitle: string
    description: string
    remarks: string
    earn1: number
    earn2: number
    earn3: number
    ded1: number
    ded2: number
    ded3: number
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
  

  export interface AggToSendModel {
    EmpAgreementId: number
    EmpId: number
    AgStart: string
    AgEnd: string
    Department: string
    JobTitle: string
    Description: string
    Remarks: string
    Earn1: number
    Earn2: number
    Earn3: number
    Ded1: number
    Ded2: number
    Ded3: number
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
  