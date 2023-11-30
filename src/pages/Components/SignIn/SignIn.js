import { useState } from "react"

const SignIn = ({ onRouteChange, loadUser }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{1,}$/;

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        const isEmailValid = emailRegex.test(formData.email);
        const isPasswordValid = passwordRegex.test(formData.password);

        if (!isEmailValid || !isPasswordValid) {
            setError(true);
            setLoading(false);
            return;
        }
        fetch(`${process.env.SERVER}/signin`,
            {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(
                    formData
                )
            })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    setLoading(true)
                    loadUser(user)
                    onRouteChange('home')
                } else {
                    setLoading(false)
                    setError(true)
                }
            })
            .catch(err => console.log("Failed Fetch"))
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-auto">
            <div className="w-full rounded-lg shadow-xl sm:max-w-md xl:p-0 border-2 border-gray-300 bg-white">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Your email</label>
                            <input onChange={onInputChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Password</label>
                            <input onChange={onInputChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5 block" required="" />
                        </div>
                        {error && <div className="text-xs text-red-400">Incorrect Username and Password Combination !</div>}
                        {loading ?
                            <p className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">
                                Loading . . .
                            </p>
                            :
                            <button onClick={onSubmitSignIn} type="submit" className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">
                                Sign In
                            </button>
                        }

                        <p className="text-sm font-light">
                            Don’t have an account yet? <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => onRouteChange('register')}>Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn