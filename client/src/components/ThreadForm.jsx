import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function ThreadForm() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const response = await axios.post("/api/threads", data);
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"],
            });

            reset();
        },

        onError: (error) => {
            const serverErrors = error.response?.data?.errors;

            if (
                serverErrors &&
                Object.keys(serverErrors).length > 0
            ) {
                Object.entries(serverErrors).forEach(
                    ([field, message]) => {
                        setError(field, {
                            type: "server",
                            message,
                        });
                    }
                );
            } else {
                setError("root.server", {
                    type: "server",
                    message: "Could not save. Please try again.",
                });
            }
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>

                <input
                    id="title"
                    {...register("title", {
                        required: "Title is required",
                    })}
                />

                {errors.title && (
                    <p>{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="body">Body</label>

                <textarea
                    id="body"
                    {...register("body", {
                        required: "Body is required",
                    })}
                />

                {errors.body && (
                    <p>{errors.body.message}</p>
                )}
            </div>

            {errors.root?.server && (
                <p>{errors.root.server.message}</p>
            )}

            <button
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending
                    ? "Creating…"
                    : "Create thread"}
            </button>
        </form>
    );
}

export default ThreadForm;