"use cache";

import { unstable_cacheLife as cacheLife } from "next/cache";

export default async function Home() {
  cacheLife("seconds");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Hello World</h1>
      {data.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
