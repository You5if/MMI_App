export interface EmpInvToSend {
    EmpInvId: number
    EmpId: number
    EmpInvListId: number
    ModelNo: string
    Specs: string
    Expiry: string
    AllocationDate: string
    WitnessEmp1: number
    WitnessEmp2: number
    AllocRemarks: string
    WithdrawDate: string
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
    expiry: string
    allocationDate: string
    witnessEmp1: number
    witnessEmp2: number
    allocRemarks: string
    withdrawDate: string
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
  