import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  phone: string;
  name?: string;
}

interface SecurityQuestion {
  question: string;
  answer: string;
}

export interface LoanData {
  amount: string;
  purpose: string;
  tenor: string;
  houseNumber: string;
  houseAddress: string;
  landmark: string;
  state: string;
  lga: string;
  city: string;
  utilityBill?: string;
  status: "pending" | "approved" | "rejected" | "none";
}

export interface SignupData {
  firstName: string;
  lastName: string;
  phone: string;
  dialCode: string;
  email: string;
  howDidYouHear: string;
  referralCode?: string;
  password?: string;
  securityQuestions: SecurityQuestion[];
  kycData: {
    bvn?: string;
    livenessCompleted: boolean;
    nextOfKinFirstName?: string;
    nextOfKinLastName?: string;
    nextOfKinPhone?: string;
    nextOfKinRelation?: string;
    nextOfKinCompleted: boolean;
    employmentStatus?: string;
    employerName?: string;
    sector?: string;
    industry?: string;
    monthlyIncome?: string;
    payDate?: string;
    workState?: string;
    workCity?: string;
    workAddress?: string;
    workEmail?: string;
    isPEP?: boolean;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    bankPhoneNumber?: string;
    transactionPin?: string;
    employmentCompleted: boolean;
    pepCompleted: boolean;
    bankDetailsCompleted: boolean;
    transactionPinCompleted: boolean;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signupData: SignupData;
  loanData: LoanData;
  setAuth: (user: User, token: string) => void;
  setSignupData: (data: Partial<SignupData>) => void;
  setKYCData: (data: Partial<SignupData["kycData"]>) => void;
  setLoanData: (data: Partial<LoanData>) => void;
  resetSignupData: () => void;
  logout: () => void;
  modal: boolean;
  setModal: (data: boolean) => void;
}

const initialSignupData: SignupData = {
  firstName: "",
  lastName: "",
  phone: "",
  dialCode: "+234",
  email: "",
  howDidYouHear: "",
  referralCode: "",
  password: "",
  securityQuestions: [
    { question: "", answer: "" },
    { question: "", answer: "" },
  ],
  kycData: {
    bvn: "",
    livenessCompleted: false,
    nextOfKinFirstName: "",
    nextOfKinLastName: "",
    nextOfKinPhone: "",
    nextOfKinRelation: "",
    nextOfKinCompleted: false,
    employmentStatus: "",
    employerName: "",
    sector: "",
    industry: "",
    monthlyIncome: "",
    payDate: "",
    workState: "",
    workCity: "",
    workAddress: "",
    workEmail: "",
    isPEP: false,
    bankName: "",
    accountNumber: "",
    accountName: "",
    bankPhoneNumber: "",
    transactionPin: "",
    employmentCompleted: false,
    pepCompleted: false,
    bankDetailsCompleted: false,
    transactionPinCompleted: false,
  },
};

const initialLoanData: LoanData = {
  amount: "",
  purpose: "",
  tenor: "",
  houseNumber: "",
  houseAddress: "",
  landmark: "",
  state: "",
  lga: "",
  city: "",
  status: "none",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      signupData: { ...initialSignupData },
      loanData: { ...initialLoanData },
      modal: false,
      setModal: (state) => set({ modal: state }),
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      setSignupData: (data) =>
        set((state) => ({
          signupData: { ...state.signupData, ...data },
        })),
      setKYCData: (data) =>
        set((state) => ({
          signupData: {
            ...state.signupData,
            kycData: { ...(state.signupData.kycData || {}), ...data },
          },
        })),
      setLoanData: (data) =>
        set((state) => ({
          loanData: { ...state.loanData, ...data },
        })),
      resetSignupData: () => set({ signupData: { ...initialSignupData } }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          signupData: { ...initialSignupData },
        }),
    }),
    {
      name: "peakpay-auth",
    },
  ),
);
