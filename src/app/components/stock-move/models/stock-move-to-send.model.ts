import { StockMoveChildModel } from "./stock-move-child.model"
import { StockMoveToReqModel } from "./stock-move.model"

export interface StockMoveToSendModel {
    stockMoveEntry: StockMoveToReqModel
    stMovDetEntries: StockMoveChildModel[]
  }