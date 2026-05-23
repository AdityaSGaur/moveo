import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking, ModuleType } from "@/types";

interface BookingState {
  currentBooking: Booking | null;
  bookingHistory: Booking[];
  activeModule: ModuleType;
}

const initialState: BookingState = {
  currentBooking: null,
  bookingHistory: [],
  activeModule: "movie",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setActiveModule: (state, action: PayloadAction<ModuleType>) => {
      state.activeModule = action.payload;
    },
    setCurrentBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload;
    },
    addToHistory: (state, action: PayloadAction<Booking>) => {
      state.bookingHistory.unshift(action.payload);
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { setActiveModule, setCurrentBooking, addToHistory, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
