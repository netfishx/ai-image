import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Hello World</h1>
      <Link href="/personal">个人中心</Link>
      <Link href="/a">a</Link>
    </div>
  );
}
