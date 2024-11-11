import { RootState } from '@/app/store.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface FlowState {
  selectedNodeId?: string;
}

const initialState: FlowState = {
  selectedNodeId: undefined,
};

export const flowSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSelectedNodeId: (state, action: PayloadAction<string>) => {
      state.selectedNodeId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedNodeId } = flowSlice.actions;

export const flowSliceReducer = flowSlice.reducer;
export const getFlowSliceState = (state: RootState) => state.flowSliceReducer;
