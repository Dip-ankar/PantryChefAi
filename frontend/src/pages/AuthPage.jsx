import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {isLoginView ? (
          <>
            <h2 className="text-center text-3xl font-bold text-gray-800">Login</h2>
            <LoginForm />
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLoginView(false)}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-center text-3xl font-bold text-gray-800">Create Account</h2>
            <RegisterForm />
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setIsLoginView(true)}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;