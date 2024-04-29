import { PurchaseChildModel } from "./purchase-child.model"
import { PurchaseToReqModel } from "./purchase.model"

export interface PurchaseToSendModel {
    purInvEntry: PurchaseToReqModel
    purInvDetEntries: PurchaseChildModel[]
  }