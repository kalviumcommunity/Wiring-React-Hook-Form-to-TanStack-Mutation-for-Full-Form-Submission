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
      // TODO 3: close the loop after a successful create.
      // - invalidate the ["threads"] query so the list refetches
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      // - reset() the form so the fields clear for the next entry
      reset();
    },
    onError: (error) => {
      // TODO 4: route server errors back into the form.
      // The server sends 400 with error.response.data.errors, e.g.
      //   { title: "Title already taken" }
      const fieldErrors = error.response?.data?.errors;
      if (fieldErrors) {
        // - for each [field, message], call setError(field, { type: "server", message })
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
      } else {
        // - if there is no field detail, call
        // setError("root.server", { message: "Could not save. Please try again." })
        setError("root.server", { message: "Could not save. Please try again." });
      }
    },
  });

  // TODO 1: handleSubmit runs client validation first, then calls this with valid data.
  // Fire the mutation here.
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

      {/* Form-wide server error (not tied to a single field) */}
      {errors.root?.server && <p role="alert">{errors.root.server.message}</p>}

      {/* TODO 2: disable this button while the mutation is pending, and show
          "Creating…" instead of "Create thread". Read mutation.isPending. */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating…" : "Create thread"}
      </button>
    </form>
  );
}
