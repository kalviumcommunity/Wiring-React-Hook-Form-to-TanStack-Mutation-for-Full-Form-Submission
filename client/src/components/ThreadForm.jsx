
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threadApi";

export default function ThreadForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", body: "" } });

  const mutation = useMutation({
    mutationFn: (data) => createThread(data),

    onSuccess: () => {
      // TODO 3: Refresh the thread list and clear the form.
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      reset();
    },

    onError: (error) => {
      // TODO 4: Show server errors in the form.
      const fieldErrors = error.response?.data?.errors;

      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message,
          });
        });
      } else {
        setError("root.server", {
          message: "Could not save. Please try again.",
        });
      }
    },
  });

  // TODO 1: Submit valid form data.
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p role="alert">{errors.title.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          {...register("body", { required: "Body is required" })}
        />
        {errors.body && <p role="alert">{errors.body.message}</p>}
      </div>

      {/* Form-wide server error */}
      {errors.root?.server && (
        <p role="alert">{errors.root.server.message}</p>
      )}

      {/* TODO 2: Disable while saving */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating…" : "Create thread"}
      </button>
    </form>
  );
}
