export interface ActivationResponse {
  message: string;
  user: { isVerified: boolean; status: string };
}
