import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Store token in localStorage
            localStorage.setItem('authToken', token);
            console.log('Authentication successful, token stored');
            // Redirect to dashboard
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
        } else {
            // No token found, redirect to login
            console.error('No token received from OAuth callback');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-borea-gradient text-white">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
                <p className="text-lg font-medium">Authenticating...</p>
                <p className="text-sm text-text-muted mt-2">Please wait while we sign you in</p>
            </div>
        </div>
    );
};

export default AuthSuccess;
