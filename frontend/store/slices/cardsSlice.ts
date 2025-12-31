import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cardApi } from '@/services/api/cardApi';
import { Card, CreateCardDto } from '@/types';

interface CardsState {
  cards: Card[];
  currentCard: Card | null;
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  currentCard: null,
  loading: false,
  error: null,
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (hostName?: string) => {
    return await cardApi.getAll(hostName);
  },
);

export const fetchCardById = createAsyncThunk(
  'cards/fetchCardById',
  async (id: string) => {
    return await cardApi.getById(id);
  },
);

export const fetchCardBySlug = createAsyncThunk(
  'cards/fetchCardBySlug',
  async (slug: string) => {
    return await cardApi.getBySlug(slug);
  },
);

export const createCard = createAsyncThunk(
  'cards/createCard',
  async (data: { cardData: CreateCardDto; images?: Record<string, File> }) => {
    return await cardApi.create(data.cardData, data.images);
  },
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async ({ id, data }: { id: string; data: Partial<CreateCardDto> }) => {
    return await cardApi.update(id, data);
  },
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (id: string) => {
    await cardApi.delete(id);
    return id;
  },
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    clearCurrentCard: (state) => {
      state.currentCard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cards';
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.currentCard = action.payload;
      })
      .addCase(fetchCardBySlug.fulfilled, (state, action) => {
        state.currentCard = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.cards.unshift(action.payload);
        state.currentCard = action.payload;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex(
          (card) => card._id === action.payload._id,
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
        if (state.currentCard?._id === action.payload._id) {
          state.currentCard = action.payload;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card._id !== action.payload);
        if (state.currentCard?._id === action.payload) {
          state.currentCard = null;
        }
      });
  },
});

export const { clearCurrentCard } = cardsSlice.actions;
export default cardsSlice.reducer;

