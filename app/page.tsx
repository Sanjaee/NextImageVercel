import Cart from "@/components/Cart";
import Link from "next/link";
import { getImage } from "@/lib/data";

export default async function Home() {
  const images = await getImage();
  return (
    <div className="max-w-screen-lg mx-auto py-14">
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold">Lates image</h1>
        <Link
          href="/create"
          className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white"
        >
          uplode new image
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {images.map((item) => (
          <Cart key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
