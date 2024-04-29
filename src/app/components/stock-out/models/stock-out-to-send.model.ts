import { StockOutChildModel } from "./stock-out-child.model"
import { StockOutToReqModel } from "./stock-out.model"

export interface StockOutToSendModel {
    stockOutEntry: StockOutToReqModel
    stockOutDetEntries: StockOutChildModel[]
  }