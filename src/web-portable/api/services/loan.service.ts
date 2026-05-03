import apiClient from '../client';

export interface LoanApplicationRequest {
  amount: number;
  tenure: number;
  purpose: string;
  repayment_method: string;
}

class LoanService {
  async applyForLoan(data: LoanApplicationRequest) {
    const response = await apiClient.post('/loans/apply', data);
    return response.data;
  }

  async getLoans() {
    const response = await apiClient.get('/loans');
    return response.data;
  }

  async getLoanById(id: string) {
    const response = await apiClient.get(`/loans/${id}`);
    return response.data;
  }
}

export default new LoanService();
