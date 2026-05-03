// /**
//  * API Client Usage Examples
//  * 
//  * This file demonstrates how to use the apiClient for making API calls
//  * with automatic token refresh handling.
//  */

// import { apiClient } from '@/lib/apiClient';

// // ============================================
// // EXAMPLE 1: Basic GET Request
// // ============================================
// export const fetchUserProfile = async () => {
//   try {
//     const response = await apiClient.get('/api/user/profile');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch user profile:', error);
//     throw error;
//   }
// };

// // ============================================
// // EXAMPLE 2: POST Request with Data
// // ============================================
// export const submitOrder = async (orderData: any) => {
//   try {
//     const response = await apiClient.post('/api/orders', orderData);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to submit order:', error);
//     throw error;
//   }
// };

// // ============================================
// // EXAMPLE 3: PUT Request (Update)
// // ============================================
// export const updateUserSettings = async (settings: any) => {
//   try {
//     const response = await apiClient.put('/api/user/settings', settings);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to update settings:', error);
//     throw error;
//   }
// };

// // ============================================
// // EXAMPLE 4: DELETE Request
// // ============================================
// export const deleteTransaction = async (transactionId: string) => {
//   try {
//     const response = await apiClient.delete(`/api/transactions/${transactionId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to delete transaction:', error);
//     throw error;
//   }
// };

// // ============================================
// // EXAMPLE 5: Request with Query Parameters
// // ============================================
// export const fetchTransactions = async (page: number = 1, limit: number = 10) => {
//   try {
//     const response = await apiClient.get('/api/transactions', {
//       params: { page, limit },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch transactions:', error);
//     throw error;
//   }
// };

// // ============================================
// // EXAMPLE 6: Custom Headers
// // ============================================
// export const uploadFile = async (file: File) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await apiClient.post('/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to upload file:', error);
//     throw error;
//   }
// };

// // ============================================
// // EXAMPLE 7: React Hook for API Calls
// // ============================================
// import { useState, useCallback } from 'react';
// import { AxiosError } from 'axios';

// interface UseApiState<T> {
//   data: T | null;
//   loading: boolean;
//   error: AxiosError | null;
// }

// export const useApi = <T,>(
//   apiFunction: () => Promise<T>,
//   immediate: boolean = true
// ) => {
//   const [state, setState] = useState<UseApiState<T>>({
//     data: null,
//     loading: immediate,
//     error: null,
//   });

//   const execute = useCallback(async () => {
//     setState({ data: null, loading: true, error: null });
//     try {
//       const result = await apiFunction();
//       setState({ data: result, loading: false, error: null });
//       return result;
//     } catch (err) {
//       const error = err as AxiosError;
//       setState({ data: null, loading: false, error });
//       throw error;
//     }
//   }, [apiFunction]);

//   // Execute immediately if requested
//   useState(() => {
//     if (immediate) {
//       execute();
//     }
//   }, [immediate, execute]);

//   return { ...state, refetch: execute };
// };

// // ============================================
// // EXAMPLE 8: Using the Hook in a Component
// // ============================================
// /*
// import { useApi } from '@/lib/apiClient.examples';

// function UserProfile() {
//   const { data: profile, loading, error, refetch } = useApi(fetchUserProfile);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>{profile?.name}</h1>
//       <button onClick={refetch}>Refresh</button>
//     </div>
//   );
// }
// */

// // ============================================
// // ENVIRONMENT SETUP
// // ============================================
// /*
// Create a .env file in your project root with:

// REACT_APP_API_URL=https://your-api.com
// REACT_APP_ACCESS_TOKEN_KEY=accessToken
// REACT_APP_REFRESH_TOKEN_KEY=refreshToken
// REACT_APP_REFRESH_ENDPOINT=/auth/refresh-token

// Or customize when creating the client:

// import { createApiClient } from '@/lib/apiClient';

// const customApiClient = createApiClient({
//   baseURL: 'https://custom-api.com',
//   accessTokenKey: 'myAccessToken',
//   refreshTokenKey: 'myRefreshToken',
//   refreshTokenEndpoint: '/api/auth/refresh',
// });
// */

// // ============================================
// // AUTOMATIC TOKEN REFRESH FLOW
// // ============================================
// /*
// When a request fails with 401 (Unauthorized):

// 1. Check if we're already refreshing the token
//    - If yes: Queue the failed request and wait for refresh
//    - If no: Start refresh process

// 2. Get refresh token from localStorage

// 3. Call refresh token endpoint with refresh token

// 4. Store new access token (and refresh token if provided)

// 5. Retry the original failed request with new token

// 6. Process all queued requests with new token

// 7. If refresh fails: Clear tokens and redirect to login
// */
