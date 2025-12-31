import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { templateApi } from '@/services/api/templateApi';
import { Template, CardType } from '@/types';

interface TemplatesState {
  templates: Template[];
  currentTemplate: Template | null;
  loading: boolean;
  error: string | null;
  filter: CardType | null;
}

const initialState: TemplatesState = {
  templates: [],
  currentTemplate: null,
  loading: false,
  error: null,
  filter: null,
};

export const fetchTemplates = createAsyncThunk(
  'templates/fetchTemplates',
  async (type?: CardType) => {
    return await templateApi.getAll(type);
  },
);

export const fetchTemplateById = createAsyncThunk(
  'templates/fetchTemplateById',
  async (id: string) => {
    return await templateApi.getById(id);
  },
);

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<CardType | null>) => {
      state.filter = action.payload;
    },
    clearCurrentTemplate: (state) => {
      state.currentTemplate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch templates';
      })
      .addCase(fetchTemplateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplateById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTemplate = action.payload;
      })
      .addCase(fetchTemplateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch template';
      });
  },
});

export const { setFilter, clearCurrentTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;



