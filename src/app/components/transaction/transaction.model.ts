export interface TransactionModel  {
    fundTransId: number
    fundCode: string
    transType: string
    journEntryId: number
    transDate: any
    description: string
    paymentType: string
    transAmt: number
    chequeNo: string
    chequeDate: any
    fromAccount: number
    toAccount: number
    cheqStatus: string
    cheqRemarks: string
    reference: string
    narration: string
    refTo: number
    refKey: number
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
  
  
    
  
    export interface TransactionToSendModel {
        FundTransId: number
        FundCode: string
        TransType: string
        JournEntryId: number
        TransDate: any
        Description: string
        PaymentType: string
        TransAmt: number
        ChequeNo: string
        ChequeDate: any
        FromAccount: number
        ToAccount: number
        CheqStatus: string
        CheqRemarks: string
        Reference: string
        Narration: string
        RefTo: number
        RefKey: number
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
      