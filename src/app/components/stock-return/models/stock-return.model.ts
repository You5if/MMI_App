export interface StockReturnModel {
    stockRetId: number
    purInvId: number
    returnDate: any
    remarks: string
    description: string
    payRetMod: string
    toAccount: number
    journalEntryId: number
    paid: boolean
    creditNoteId: number
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
  
export interface StockReturnToReqModel {
    StockRetId: number
    PurInvId: number
    ReturnDate: any
    Remarks: string
    Description: string
    PayRetMod: string
    ToAccount: number
    JournalEntryId: number
    Paid: boolean
    CreditNoteId: number
    IsTest: boolean
    Active: boolean
    UserCR: number
    Company: number
    RoleCR: number
    Browser: string
    Device: string
    Resol: string
    TransId: number
  }