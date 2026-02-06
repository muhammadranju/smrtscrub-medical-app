export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  profileImg?: string;
  status?: string;
  userStatus?: "active" | "blocked";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  authToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string;
  logout: boolean;
  moduleTitle: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
  remember?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;

  data: any; // Token or Object containing accessToken and user
  accessToken?: string;
  user?: User;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: User;
  user?: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: number;
}

export interface ResetPasswordRequest {
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  authToken?: string;
}
