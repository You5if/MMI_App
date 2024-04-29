import { SaleChildModel } from "./sale-child.model"
import { SaleToReqModel } from "./sale.model"

export interface SaleToSendModel {
    salInvEntry: SaleToReqModel
    salInvDetEntries: SaleChildModel[]
  }