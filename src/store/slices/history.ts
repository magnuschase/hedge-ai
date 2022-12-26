import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EvaluationEntry } from '../../../functions/src/shared/EvaluationEntry.interface'

interface HistoryState {
	evaluations: EvaluationEntry[]
}

const initialState: HistoryState = {
  evaluations: []
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setEvaluations: (state, action: PayloadAction<EvaluationEntry[]>) => {
      state.evaluations = action.payload
    }
  }
})

export const { setEvaluations } = historySlice.actions
