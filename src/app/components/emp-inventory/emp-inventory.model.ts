export interface EmpInvToSend {
    EmpInvId: number
    EmpId: number
    EmpInvListId: number
    ModelNo: string
    Specs: string
    Expiry: Date
    AllocationDate: any
    WitnessEmp1: number
    WitnessEmp2: number
    AllocRemarks: string
    WithdrawDate: any
    WitnessWDEmp1: number
    WitnessWDEmp2: number
    WithdrRemarks: string
    CostOfItem: number
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
  

  export interface EmpInvModel {
    empInvId: number
    empId: number
    empInvListId: number
    modelNo: string
    specs: string
    expiry: Date
    allocationDate: any
    witnessEmp1: number
    witnessEmp2: number
    allocRemarks: string
    withdrawDate: any
    witnessWDEmp1: number
    witnessWDEmp2: number
    withdrRemarks: string
    costOfItem: number
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
  