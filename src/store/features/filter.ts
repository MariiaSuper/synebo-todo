import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/Status';

const initialState = {
  status: 'all' as Status
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload
      };
    }
  }
});
