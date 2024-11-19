import axios from 'axios';

// Bluesky API endpoints
const BASE_URL = 'https://bsky.social/xrpc';

export const createSession = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/com.atproto.server.createSession`, {
      identifier,
      password,
    });

    if (response.status === 200) {
      return response.data; // Contains accessJwt, refreshJwt, did, and handle
    }
    throw new Error('Failed to create session');
  } catch (error: any) {
    console.error('Error creating session:', error.response?.data || error.message);
    throw new Error('Invalid credentials');
  }
};

export const refreshSession = async (refreshJwt: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/com.atproto.server.refreshSession`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshJwt}` },
      }
    );

    if (response.status === 200) {
      return response.data; // Contains new accessJwt and expiry details
    }
    throw new Error('Failed to refresh session');
  } catch (error: any) {
    console.error('Error refreshing session:', error.response?.data || error.message);
    throw new Error('Session refresh failed');
  }
};