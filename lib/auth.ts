import { nhost } from './nhost';

export const signInWithProvider = async (provider: 'github' | 'google' | 'linkedin') => {
  try {
    // Get the Codespaces URL or fallback to window.location.origin
    const redirectBase = process.env.NEXT_PUBLIC_CODESPACE_URL || 
                        (typeof window !== 'undefined' ? window.location.origin : '');
    
    const { error, session } = await nhost.auth.signIn({
      provider,
      options: {
        redirectTo: `${redirectBase}/dashboard`,
      }
    });
    if (error) throw error;
    return session;
  } catch (error: any) {
    console.error('Auth error:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signOut = async () => {
  try {
    const { error } = await nhost.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const getUser = () => {
  return nhost.auth.getUser();
};
