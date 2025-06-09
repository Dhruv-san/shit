import { NhostClient } from '@nhost/nextjs';

const getRedirectUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // For Codespaces environment
  if (process.env.NEXT_PUBLIC_CODESPACE_URL) {
    return process.env.NEXT_PUBLIC_CODESPACE_URL;
  }
  
  // Fallback to current origin
  return window.location.origin;
};

export const nhost = new NhostClient({
  subdomain: 'jdhikwjcjpnrsgpoooom',
  region: 'ap-south-1',
  clientStorageType: 'localStorage',
  clientStorage: typeof window !== 'undefined' ? window.localStorage : undefined,
  autoRefreshToken: true,
  start: false, // Don't start the client until we're in the browser
  authCookieOptions: {
    sameSite: 'none',
    secure: true
  },
  clientUrl: getRedirectUrl(),
  refreshIntervalTime: 600000 // 10 minutes
});

// Create GraphQL client with dynamic auth token handling
export const getGraphQLClient = () => {
  const token = nhost.auth.getAccessToken();
  
  return {
    request: async (query: string, variables?: any) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(nhost.graphql.getUrl(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            query,
            variables,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 502) {
            throw new Error('Server is temporarily unavailable. Please try again in a few moments.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error('Server returned non-JSON response');
        }

        const json = await response.json();
        if (json.errors) {
          const errorMessage = json.errors.map((e: any) => e.message).join(', ');
          throw new Error(errorMessage);
        }

        return json.data;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection and try again.');
        }
        throw error;
      }
    },
  };
};

export default nhost;
