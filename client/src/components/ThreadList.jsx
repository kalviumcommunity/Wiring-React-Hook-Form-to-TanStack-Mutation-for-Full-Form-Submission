import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threadApi";

export default function ThreadList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  if (isPending) return <p>Loading threads…</p>;
  if (isError) return <p role="alert">Could not load threads.</p>;

  // Ensure we always have an array
  const threads = Array.isArray(data) ? data : data?.threads || [];

  return (
    <ul>
      {threads.map((thread) => (
        <li key={thread.id}>
          <strong>{thread.title}</strong> — {thread.body}
        </li>
      ))}
    </ul>
  );
}
