const Navigation = ({ onRouteChange, isSignedIn, route, emptyUser }) => {
    if (isSignedIn) {
        return (
            <nav className="flex flex-row-reverse pt-8 pr-8" >
                <p onClick={() => {
                    onRouteChange("signin");
                    emptyUser();
                }} className="px-4 py-1 rounded-lg text-slate-600 hover:underline cursor-pointer ">Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav className="flex flex-row-reverse pt-8 pr-8" >
                {route === 'register' ?
                    <p onClick={() => onRouteChange("register")} className="px-4 py-1 rounded-lg text-slate-600 duration200 hover:underline cursor-pointer">
                        Register
                        </p>
                    :
                    <p onClick={() => onRouteChange("signin")} className="px-4 py-1 rounded-lg text-slate-600 duration-200 hover:underline cursor-pointer">
                        Sign In
                        </p>
                }
            </nav>
        )
    }
}

export default Navigation;