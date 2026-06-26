import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { RegisterFormData, RegisterPayload } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { VALIDATION_MESSAGES, PLACEHOLDERS, REGISTER_TEXT } from "../constants";

interface RegisterProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ isLogin, setIsLogin }: RegisterProps) => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>();

    useEffect(() => {
        if (isLogin) {
            reset();
        }
    }, [isLogin, reset]);
    const registerMutation = useMutation({
        mutationFn: registerUser,

        onSuccess: (response) => {
            toast.success(response.message);
            reset();
        },

        onError: (error: Error) => {
            toast.error(error.message || REGISTER_TEXT.GENERIC_ERROR);
        },
    });
    const onSubmit = (data: RegisterFormData) => {
        const payload: RegisterPayload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        };

        registerMutation.mutate(payload);
    };

    return (
        <div className="p-10 lg:p-12 flex flex-col justify-center bg-">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    {REGISTER_TEXT.TITLE}
                </h1>

                <p className="text-gray-500 mt-2">
                    {REGISTER_TEXT.SUBTITLE}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder={PLACEHOLDERS.FIRST_NAME}
                            {...register("firstName", {
                                required: VALIDATION_MESSAGES.FIRST_NAME_REQUIRED,
                            })}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder={PLACEHOLDERS.LAST_NAME}
                            {...register("lastName", {
                                required: VALIDATION_MESSAGES.LAST_NAME_REQUIRED,
                            })}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        type="email"
                        placeholder={PLACEHOLDERS.EMAIL}
                        {...register("email", {
                            required: VALIDATION_MESSAGES.EMAIL_REQUIRED,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: VALIDATION_MESSAGES.EMAIL_INVALID,
                            },
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder={PLACEHOLDERS.PASSWORD}
                        {...register("password", {
                            required: VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                            minLength: {
                                value: 6,
                                message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH,
                            },
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
                        {...register("confirmPassword", {
                            required: VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED,
                            validate: (value) =>
                                value === watch("password") ||
                                VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH,
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                >
                    {registerMutation.isPending
                        ? REGISTER_TEXT.SUBMIT_BUTTON_LOADING
                        : REGISTER_TEXT.SUBMIT_BUTTON}
                </button>
            </form>

            <p className="text-center text-sm mt-6">
                {REGISTER_TEXT.LOGIN_PROMPT}{" "}
                <span
                    onClick={() => setIsLogin(true)}
                    className="text-indigo-600 cursor-pointer font-semibold"
                >
                    {REGISTER_TEXT.LOGIN_LINK}
                </span>
            </p>
        </div>
    );
}

export default Register;