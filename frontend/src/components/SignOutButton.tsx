import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../services/apiClient"
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.logout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Logout successfull", type: "SUCCESS"});
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
        }
    });

    const handleClick = () => {
        mutation.mutate();
    }

    return(
        <button 
            className="flex bg-zinc-350 items-center text-zinc-200 px-3 font-bold hover:bg-zinc-500"
            onClick={handleClick}>
            Sign out
        </button>
    );
};

export default SignOutButton;