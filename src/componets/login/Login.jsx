import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useAuth"
import { useForm } from "../../hooks/useForm"
import { useNavigate } from "react-router-dom";

const initialValues = { email: '', password: '' }
export default function Login() {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const login = useLogin();
    const loginHandler = async ({ email, password }) => {
    
        try{
             await login(email, password);
            navigate("/")
        }
        catch(error)
        {
            setError(error.message);
        }
    }
    const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={values.email}
                                    onChange={changeHandler}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={changeHandler}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-purple-600 hover:text-purple-500">
                                {error}
                            </p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to='/register' className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
