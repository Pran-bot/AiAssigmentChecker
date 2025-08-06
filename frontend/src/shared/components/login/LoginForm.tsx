import { useState, useEffect } from "react"; // Import useEffect
import type { FormEvent } from 'react'
import useManualFetch from "../../hooks/useManualFetch";

import { useDispatch } from "react-redux";
import { updateAuth } from '../../../features/auth/authSlice';

import { Link, useNavigate } from "react-router-dom";

interface LoginFormProps {
  role: string;
  url: string;
}

const LoginForm = ({ role, url }: LoginFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { execute, data, status, error } = useManualFetch<any>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simply initiate the fetch here.
    // The navigation and dispatch will be handled by the useEffect below.
    await execute(url, 'POST', { email, password });
  };

  // Use useEffect to react to changes in 'status' and 'data'
  useEffect(() => {
    if (status === 'success' && data) {
      dispatch(
        updateAuth({
          authenticated: true,
          user: `${data.first_name} ${data.last_name}`,
        })
      );
      console.log('navigating to role', role);
      navigate(`/${role}`); // No need for await here as navigate is not async
    }
  }, [status, data, dispatch, navigate, role]); // Add all dependencies

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white shadow-xl rounded-[2vw]">
      <div className="font-semibold text-3xl text-gray-800">For {role}</div>

      <label htmlFor="email" className="text-sm font-medium text-gray-600">
        Email
      </label>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-[2vw] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="password" className="text-sm font-medium text-gray-600">
        Password
      </label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-[2vw] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {status === 'error' && <p className="text-red-600 align-middle">Incorrect Password or Email</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-[2vw] hover:bg-blue-700 transition-colors"
      >
        {
          status === 'loading' ? (
            <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
          ) : (
            'Login'
          )
        }
      </button>
      <Link className="text-blue-600 px-21" to={'/auth/signup'}>Don't have an account</Link>
    </form>
  );
};

export default LoginForm;
