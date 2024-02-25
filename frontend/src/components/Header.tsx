import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-zinc-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Find me the MATCH</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? <>
                            <Link 
                                to="/my-matches"
                                className="flex bg-zinc-350 items-center text-zinc-200 px-3 font-bold hover:bg-zinc-500">
                                My Matches
                            </Link>
                            <SignOutButton />
                            
                    </> : <Link 
                            to="/sign-in" 
                            className="flex bg-zinc-350 items-center text-zinc-200 px-3 font-bold hover:bg-zinc-500">
                                Sign in
                            </Link>
                    }
                </span>
            </div>
        </div>
    );
}

export default Header;