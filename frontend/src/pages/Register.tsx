import { useForm }  from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../services/apiClient";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const { register, watch, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            console.log("registration successfull");
        },
        onError: (error: Error) => {
            console.log(error.message);
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl text-zinc-700 font-bold">Create an account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-zinc-700 text-sm font-bold flex-1">
                    First name
                    <input 
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("firstName", {required: "This field is required."})}
                    ></input>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="text-zinc-700 text-sm font-bold flex-1">
                    Last name
                    <input 
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("lastName", {required: "This field is required."})}
                    ></input>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-zinc-700 text-sm font-bold flex-1">
                    Confirm password
                    <input 
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("confirmPassword", {
                            validate: (val: any) => {
                                if(!val){
                                    return "This field is required.";
                                } else if(watch("password") !== val){
                                    return "Your passwords are not matching.";
                                }
                            }
                        })}
                    ></input>
                    {errors.confirmPassword && (
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </label>
            </div>
            <span>
                <button type="submit" className="bg-zinc-700 text-white p-2 font-bold hover:bg-zinc-900 text-xl">
                    Create account
                </button>
            </span>
        </form>
    );
};

export default Register;