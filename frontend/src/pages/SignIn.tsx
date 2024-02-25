import { useForm }  from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../services/apiClient";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, handleSubmit, formState: {errors} } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({message: "Sign in successful", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl text-zinc-700 font-bold">Sign in</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-zinc-700 text-sm font-bold flex-1">
                    Email
                    <input 
                        /* TODO: enhanced validation */
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("email", {required: "This field is required."})}
                    ></input>
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-zinc-700 text-sm font-bold flex-1">
                    Password
                    <input 
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("password", {
                            required: "This field is required.",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters."
                            }
                        })}
                    ></input>
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>
            </div>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not registered?{" "}
                    <Link to="/register" className="underline">
                        Create an account here
                    </Link>
                </span>
                <button type="submit" className="bg-zinc-700 text-white p-2 font-bold hover:bg-zinc-900 text-xl">
                    Login
                </button>
            </span>
        </form>
    );
};

export default SignIn;