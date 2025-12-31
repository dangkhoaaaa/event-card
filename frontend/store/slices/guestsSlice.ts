import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { guestApi } from '@/services/api/guestApi';
import { Guest, CreateGuestDto } from '@/types';

interface GuestsState {
  guests: Guest[];
  statistics: {
    total: number;
    viewed: number;
    responded: number;
    attending: number;
    notAttending: number;
    maybe: number;
  } | null;
  loading: boolean;
  error: string | null;
  currentCardId: string | null;
}

const initialState: GuestsState = {
  guests: [],
  statistics: null,
  loading: false,
  error: null,
  currentCardId: null,
};

export const fetchGuests = createAsyncThunk(
  'guests/fetchGuests',
  async (cardId: string) => {
    return await guestApi.getAll(cardId);
  },
);

export const fetchStatistics = createAsyncThunk(
  'guests/fetchStatistics',
  async (cardId: string) => {
    return await guestApi.getStatistics(cardId);
  },
);

export const createGuest = createAsyncThunk(
  'guests/createGuest',
  async (data: CreateGuestDto) => {
    return await guestApi.create(data);
  },
);

export const createBulkGuests = createAsyncThunk(
  'guests/createBulkGuests',
  async (data: { cardId: string; names: string[]; email?: string }) => {
    return await guestApi.createBulk(data);
  },
);

export const updateGuest = createAsyncThunk(
  'guests/updateGuest',
  async ({ id, data }: { id: string; data: Partial<CreateGuestDto> }) => {
    return await guestApi.update(id, data);
  },
);

export const deleteGuest = createAsyncThunk(
  'guests/deleteGuest',
  async (id: string) => {
    await guestApi.delete(id);
    return id;
  },
);

const guestsSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    setCurrentCardId: (state, action: PayloadAction<string | null>) => {
      state.currentCardId = action.payload;
    },
    clearGuests: (state) => {
      state.guests = [];
      state.statistics = null;
      state.currentCardId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loading = false;
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch guests';
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.guests.push(action.payload);
      })
      .addCase(createBulkGuests.fulfilled, (state, action) => {
        state.guests.push(...action.payload);
      })
      .addCase(updateGuest.fulfilled, (state, action) => {
        const index = state.guests.findIndex(
          (guest) => guest._id === action.payload._id,
        );
        if (index !== -1) {
          state.guests[index] = action.payload;
        }
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guests = state.guests.filter(
          (guest) => guest._id !== action.payload,
        );
      });
  },
});

export const { setCurrentCardId, clearGuests } = guestsSlice.actions;
export default guestsSlice.reducer;



