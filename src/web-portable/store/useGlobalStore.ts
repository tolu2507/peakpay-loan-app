import { create } from 'zustand';

interface GlobalState {
  isErrorModalVisible: boolean;
  errorMessage: string;
  isSuccessModalVisible: boolean;
  successMessage: string;
  isConnected: boolean;
  showBalance: boolean;
  isModalVisible: boolean;
  showError: (message: string, action?: () => void) => void;
  hideError: () => void;
  showSuccess: (message: string) => void;
  hideSuccess: () => void;
  setConnected: (connected: boolean) => void;
  setShowBalance: (show: boolean) => void;
  setModal: (visible: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isErrorModalVisible: false,
  errorMessage: '',
  isSuccessModalVisible: false,
  successMessage: '',
  isConnected: true,
  showBalance: false,
  isModalVisible: false,
  showError: (message, action) => {
    set({ isErrorModalVisible: true, errorMessage: message });
    // Web implementation: developers can listen to this state in their UI
    console.error('API [Error]:', message);
  },
  hideError: () => set({ isErrorModalVisible: false, errorMessage: '' }),
  showSuccess: (message) => {
    set({ isSuccessModalVisible: true, successMessage: message });
    // Web implementation: developers can listen to this state in their UI
    console.log('API [Success]:', message);
  },
  hideSuccess: () => set({ isSuccessModalVisible: false, successMessage: '' }),
  setConnected: (connected) => set({ isConnected: connected }),
  setShowBalance: (show) => set({ showBalance: show }),
  setModal: (visible) => set({ isModalVisible: visible }),
}));
