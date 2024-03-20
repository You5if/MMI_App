import { LoanChildModel } from "./loan-child.model";
import { LoanModel } from "./loan.model";

export interface LoanToSendModel {
    loanReqEntry: LoanModel
    loanTenEntries: LoanChildModel[]
  }
  