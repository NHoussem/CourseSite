import React from "react";

function ResetPassword(){
    return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-PrincipalCol lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black   decoration-wavy">
                    Réinitialiser mot de passe
                </h1>
                <form  className="mt-6">
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
                    <div className="mt-6">
                        <button  type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-PrincipalCol rounded-md hover:bg-SecondryCol focus:outline-none focus:bg-SecondryCol">
                            <a href="/">Login</a>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default ResetPassword;