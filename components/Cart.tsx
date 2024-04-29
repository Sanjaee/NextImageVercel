import Image from "next/image";
import { DeleteButton, EditButton } from "./Button";
import type { Uplode } from "@prisma/client";

const Cart = ({ data }: { data: Uplode }) => {
  return (
    <div className="max-w-sm border-gray-200 rounded-md shadow">
      <div className="relative aspect-video">
        <Image
          className="rounded-t-md object-cover"
          src={data.image}
          alt={data.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 ">
        <h1 className="text-2xl font-bold text-gray-900 truncate">
          {data.title}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <EditButton id={data.id} />
        <DeleteButton id={data.id} />
      </div>
    </div>
  );
};

export default Cart;
