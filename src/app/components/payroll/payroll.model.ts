export interface PayrollModel  {
    payRunId: number
    month: number
    year: number
    empId: number
    allowanceId: number
    amount: number
    remarks: string
    realAmount: number
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