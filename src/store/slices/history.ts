import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EvaluationEntryWithId } from '../../../functions/src/shared/EvaluationEntry.interface'

interface HistoryState {
	evaluations: EvaluationEntryWithId[]
}

const initialState: HistoryState = {
  evaluations: []
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setEvaluations: (state, action: PayloadAction<EvaluationEntryWithId[]>) => {
      state.evaluations = action.payload
    }
  }
})

export const { setEvaluations } = historySlice.actions
