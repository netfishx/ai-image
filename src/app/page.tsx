import { Link } from "next-view-transitions";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Hello World</h1>
      <Link href="/personal">个人中心</Link>
      <Link href="/gif">gif</Link>
      <Link href="/image">image</Link>
      <Link href="/video">video</Link>
      <Link href="/yjty">yjty</Link>
    </div>
  );
}
