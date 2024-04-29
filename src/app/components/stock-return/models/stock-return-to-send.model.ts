import { StockReturnChildModel } from "./stock-return-child"
import { StockReturnToReqModel } from "./stock-return.model"

export interface StockReturnToSendModel {
    stockRetEntry: StockReturnToReqModel
    stockRetDetEntries: StockReturnChildModel[]
  }