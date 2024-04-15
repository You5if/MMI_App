import { JournalChildModel } from "./journal-child.model"
import { JournalToReqModel } from "./journal.model"

export interface JournalToSendModel {
    journEntryEntry: JournalToReqModel
    journDetEntries: JournalChildModel[]
  }