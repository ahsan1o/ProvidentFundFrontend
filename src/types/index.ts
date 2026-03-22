export type ApiResponseEnvelope<T> = {
  success: boolean;
  data: T;
  meta?: {
    timestamp: string;
    requestId: string;
  };
};
