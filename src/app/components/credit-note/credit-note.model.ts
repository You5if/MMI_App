export interface CreditNoteModel  {
    creditNoteId: number
    prodFor: string
    refId: number
    credDate: any
    description: string
    remarks: string
    amount: number
    attachments: string
    journalEntryId: number
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
  

  export interface CreditNoteToSendModel {
    CreditNoteId: number
    ProdFor: string
    RefId: number
    CredDate: any
    Description: string
    Remarks: string
    Amount: number
    Attachments: string
    JournalEntryId: number
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