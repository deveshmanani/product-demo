import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  addProductModalOpen: boolean;
  itemDetailsModalOpen: boolean;
  sendConnectModalOpen: boolean;
  selectedProductId: string | null;
  selectedOptions: {
    color: string;
    size: string;
  };
}

const initialState: UIState = {
  theme: 'light',
  addProductModalOpen: false,
  itemDetailsModalOpen: false,
  sendConnectModalOpen: false,
  selectedProductId: null,
  selectedOptions: {
    color: '',
    size: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    openAddProductModal(state) {
      state.addProductModalOpen = true;
    },
    closeAddProductModal(state) {
      state.addProductModalOpen = false;
    },
    openItemDetailsModal(state) {
      state.itemDetailsModalOpen = true;
    },
    closeItemDetailsModal(state) {
      state.itemDetailsModalOpen = false;
    },
    openSendConnectModal(state) {
      state.sendConnectModalOpen = true;
    },
    closeSendConnectModal(state) {
      state.sendConnectModalOpen = false;
    },
    setSelectedProduct(state, action: PayloadAction<string | null>) {
      state.selectedProductId = action.payload;
    },
    setSelectedColor(state, action: PayloadAction<string>) {
      state.selectedOptions.color = action.payload;
    },
    setSelectedSize(state, action: PayloadAction<string>) {
      state.selectedOptions.size = action.payload;
    },
    resetSelectedOptions(state) {
      state.selectedOptions = { color: '', size: '' };
    },
  },
});

export const {
  toggleTheme,
  openAddProductModal,
  closeAddProductModal,
  openItemDetailsModal,
  closeItemDetailsModal,
  openSendConnectModal,
  closeSendConnectModal,
  setSelectedProduct,
  setSelectedColor,
  setSelectedSize,
  resetSelectedOptions,
} = uiSlice.actions;

export default uiSlice.reducer;
