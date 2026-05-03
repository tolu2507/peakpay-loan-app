# Peak-Pay Portable Web API & Logic

This directory contains a "de-natived" version of the Peak-Pay mobile application's core business logic. It is designed to be copy-pasted into any web project (React, Next.js, etc.) with minimal changes.

## 🚀 Getting Started

1.  **Copy the Folder**: Extract the `web-portable` directory and place it in your web project's `src` folder.
2.  **Install Dependencies**:
    ```bash
    npm install axios zustand
    ```
3.  **Setup State Management**: The stores in `src/web-portable/store/` use `zustand`. They are already configured to use `localStorage` for persistence (see `useAuthStore.ts`).

---

## 🔄 Core Flows Breakdown

To help you (or your AI assistant) integrate these endpoints, here is the exact sequence of events for the main features.

### 1. User Registration Flow (The "Happy Path")
The registration is a multi-step process. You must follow this order:

1.  **Fill Initial Details**: Collect names, email, and phone in your UI.
    *   **Store**: `useSignupStore`
    *   **Action**: `setFormField`
2.  **Send OTP**: Trigger an email OTP to the user.
    *   **Action**: `sendOtp()` (Calls `OtpService.sendOtp`)
    *   **Note**: Currently using a temporary ngrok endpoint for sending.
3.  **Verify OTP**: User enters the 6-digit code.
    *   **Action**: `verifyOtp(code)` (Calls `OtpService.verifyOtp`)
4.  **Register (Password)**: Once verified, user sets a password and submits the full registration.
    *   **Action**: `register()` (Calls `AuthService.register`)
5.  **Security Questions**: After registration, the user MUST set two security questions.
    *   **Fetch Questions**: `fetchSecurityQuestions()` (Calls `KycService.getSecurityQuestions`)
    *   **Submit Answers**: `answerSecurityQuestions()` (Calls `KycService.answerSecurityQuestions`)

### 2. Login & Authentication
1.  **Submit Credentials**:
    *   **Store**: `useLoginStore`
    *   **Action**: `login()`
2.  **Auth State**: Once successful, the `useAuthStore` automatically saves the `token` and `user` to `localStorage`.
3.  **Automatic Header**: Every subsequent request via `api/client.ts` will automatically include the `Authorization: Bearer <token>` header.

### 3. KYC (Know Your Customer) Flow
This is usually triggered after the first login to verify the user's identity.

1.  **BVN Verification**:
    *   **Action**: `verifyBvn()` (Calls `KycService.verifySmileId`)
2.  **Personal Information**: Update Next of Kin, Employment, etc.
    *   **Service**: `KycService` methods (e.g., `createNextOfKin`, `createEmploymentVerification`)
3.  **Transaction PIN**: Set a 4-digit PIN for sensitive actions (transfers/loans).
    *   **Action**: `createTransactionPin(pin)`

### 4. Loan Application
1.  **Submission**:
    *   **Store**: `useLoanStore`
    *   **Action**: `applyLoan()` (Calls `LoanService.applyForLoan`)

---

## 🛠 Integration Notes

### UI Feedback (Toasts)
The `useGlobalStore` has methods `showError(message)` and `showSuccess(message)`. In the mobile app, these trigger a popup. On the web:
*   You should subscribe to `useGlobalStore` in your root layout.
*   When `errorMessage` or `successMessage` changes, trigger your web notification library (e.g., `react-hot-toast`, `sonner`, or `bootstrap alerts`).

### API Client
All requests go through `api/client.ts`. If you need to change the Backend URL, update the `baseURL` constant at the top of that file.
