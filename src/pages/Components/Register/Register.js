import { useState } from "react";

const Register = ({ onRouteChange }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
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
    const onSubmitRegister = (e) => {
        e.preventDefault();
        setLoading(true)

        const isEmailValid = emailRegex.test(formData.email);
        const isPasswordValid = passwordRegex.test(formData.password);
        if (!isEmailValid || !isPasswordValid) {
            setError(true);
            setLoading(false);
            return;
        }
        fetch('http://localhost:3000/register',
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
                    onRouteChange('signin')
                    setLoading(false)
                } else {
                    setLoading(false)
                    setError("PLease Enter Valid Email, Name, and, Password")
                }
            })
            .catch(err=>console.log("Failed Fetch"))
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-auto">
            <div className="w-full rounded-lg shadow-xl sm:max-w-md xl:p-0 border-2 border-gray-300 bg-white">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Sign Up / Register
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" method="post">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Your Name</label>
                            <input onChange={onInputChange} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="Name" required="" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Your email</label>
                            <input onChange={onInputChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required="" />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium">Password</label>
                            <input onChange={onInputChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5 block" required="" />
                        </div>
                        <div></div>
                        <span></span>
                        <div></div>
                        {error && <div>{error}</div>}
                        <button onClick={onSubmitRegister} type="submit" className="mt-3 w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white" >Sign Up</button>
                    </form>
                    <p className="text-sm font-light">
                        Already have an account? <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => onRouteChange('signin')}>Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register