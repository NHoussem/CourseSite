import React ,{useContext}from 'react';
import AuthContext from '../context/AuthContext';

export default function Login() {
    let {loginUser}=useContext(AuthContext)
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-PrincipalCol lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black  uppercase decoration-wavy">
                   Sign in
                </h1>
                <form onSubmit={loginUser} className="mt-6">
                    <div className="mb-2">
                        <label

                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="/ResetPassword"
                        className="text-xs text-PrincipalCol hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button  type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-PrincipalCol rounded-md hover:bg-SecondryCol focus:outline-none focus:bg-SecondryCol">
                            <a href="/">Login</a>
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-PrincipalCol hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}