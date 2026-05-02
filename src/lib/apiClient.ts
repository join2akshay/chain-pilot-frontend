import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Types
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

interface ApiClientConfig {
  baseURL?: string;
  accessTokenKey?: string;
  refreshTokenKey?: string;
  walletAddressKey?: string;
  connectEndpoint?: string;
}

// Configuration
const DEFAULT_CONFIG: Required<ApiClientConfig> = {
  baseURL: process.env.REACT_APP_API_URL || 'https://chainpilot-backend.vercel.app',
  accessTokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
  walletAddressKey: 'walletAddress',
  connectEndpoint: '/wallet/connect',
};

// Create axios instance
const createApiClient = (config: ApiClientConfig = {}): AxiosInstance => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const instance = axios.create({
    baseURL: finalConfig.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Track if we're already refreshing token to avoid multiple refresh requests
  let isRefreshing = false;
  let failedQueue: Array<{
    onSuccess: (token: string) => void;
    onFailed: (error: AxiosError) => void;
  }> = [];

  const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.onFailed(error);
      } else if (token) {
        prom.onSuccess(token);
      }
    });
    failedQueue = [];
  };

  // Request interceptor: Add access token to headers
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(finalConfig.accessTokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: Handle token refresh on 401
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Check if error is 401 (Unauthorized) and not already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Wait for token refresh to complete
          return new Promise((onSuccess, onFailed) => {
            failedQueue.push({ onSuccess, onFailed });
          })
            .then((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const walletAddress = localStorage.getItem(finalConfig.walletAddressKey);

          if (!walletAddress) {
            // No wallet address available, clear tokens and redirect to login
            localStorage.removeItem(finalConfig.accessTokenKey);
            localStorage.removeItem(finalConfig.refreshTokenKey);
            window.location.href = '/'; // Redirect to home/login
            return Promise.reject(new Error('No wallet address found'));
          }

          // Call wallet connect endpoint to get new tokens
          const response = await axios.post<{
            success: boolean;
            data: {
              user: { id: string; walletAddress: string };
              tokens: RefreshTokenResponse;
            };
          }>(
            `${finalConfig.baseURL}${finalConfig.connectEndpoint}`,
            { walletAddress }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;

          // Store new tokens
          localStorage.setItem(finalConfig.accessTokenKey, accessToken);
          if (newRefreshToken) {
            localStorage.setItem(finalConfig.refreshTokenKey, newRefreshToken);
          }

          // Update authorization header for original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Process queued requests
          processQueue(null, accessToken);

          // Retry original request with new token
          return instance(originalRequest);
        } catch (refreshError) {
          // Wallet connect failed, clear tokens and redirect
          localStorage.removeItem(finalConfig.accessTokenKey);
          localStorage.removeItem(finalConfig.refreshTokenKey);
          localStorage.removeItem(finalConfig.walletAddressKey);
          processQueue(refreshError as AxiosError, null);
          window.location.href = '/'; // Redirect to home/login
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create default instance
export const apiClient = createApiClient();

// Export factory function for custom configuration
export { createApiClient };

// Export types
export type { RefreshTokenResponse, ApiClientConfig };
