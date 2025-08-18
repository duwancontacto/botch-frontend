export interface Distributor {
  id: string;
  name: string;
  code?: string;
  active?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
  statusCode?: number;
}

export interface InvoiceSummary {
  totalUnits: number;
  totalChances: number;
  niveles: Array<{
    min: number;
    chances: number;
  }>;
}
