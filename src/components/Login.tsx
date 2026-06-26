import { useForm } from "react-hook-form";
import { LoginFormData } from "../types/auth";
import toast from "react-hot-toast";
import { LOGIN_CONSTANTS } from "../constants";
import { useLogin } from "../hook/useLogin";

interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLogin }: LoginProps) => {
    const { mutateAsync, isPending } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await mutateAsync(data);

            const { token, userInfo } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));

            toast.success("Login successful!");

            console.log("Stored Token:", token);
            console.log("Stored User:", userInfo);

            // navigate("/home");
        } catch (error: any) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                LOGIN_CONSTANTS.VALIDATION.INVALID_CREDENTIALS
            );
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-600 mt-1">
                    {LOGIN_CONSTANTS.TITLE}
                </h2>

                <p className="text-slate-500 mt-1">
                    {LOGIN_CONSTANTS.SUBTITLE}
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder={LOGIN_CONSTANTS.EMAIL_PLACEHOLDER}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", {
                            required: LOGIN_CONSTANTS.VALIDATION.EMAIL_REQUIRED,
                            pattern: {
                                value:
                                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: LOGIN_CONSTANTS.VALIDATION.EMAIL_INVALID,
                            },
                        })}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("password", {
                            required: LOGIN_CONSTANTS.VALIDATION.PASSWORD_REQUIRED,
                        })}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {/* Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-600 text-white px-8 py-2 rounded-lg disabled:bg-gray-400"
                    >
                        {isPending ? LOGIN_CONSTANTS.LOGIN_BUTTON_LOADING : LOGIN_CONSTANTS.LOGIN_BUTTON}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default Login;