// import { useQuery } from "@tanstack/react-query";
// import { getThreads } from "../services/threadApi";

// // Provided for you. Reads the ["threads"] query the form invalidates on success.
// export default function ThreadList() {
//   const { data, isPending, isError } = useQuery({
//     queryKey: ["threads"],
//     queryFn: getThreads,
//   });

//   if (isPending) return <p>Loading threads…</p>;
//   if (isError) return <p role="alert">Could not load threads.</p>;

//   return (
//     <ul>
//       {data.map((thread) => (
//         <li key={thread.id}>
//           <strong>{thread.title}</strong> — {thread.body}
//         </li>
//       ))}
//     </ul>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threadApi";

// Reads the ["threads"] query the form invalidates on success.
export default function ThreadList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  if (isPending) {
    return <p>Loading threads…</p>;
  }

  if (isError) {
    return <p role="alert">Could not load threads.</p>;
  }

  return (
    <ul>
      {data.map((thread) => (
        <li key={thread.id}>
          <strong>{thread.title}</strong> — {thread.body}
        </li>
      ))}
    </ul>
  );
}
