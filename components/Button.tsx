"use client";
import { useFormStatus } from "react-dom";
import { clsx } from "clsx";
import Link from "next/link";
import { deleteImage } from "@/lib/actions";

const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={clsx(
        "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600",
        {
          "opacity-50 cursor-progress": pending,
        }
      )}
    >
      {label === "uplode" ? (
        <>{pending ? "Uploading..." : "Uplode"}</>
      ) : (
        <>{pending ? "Updating..." : "Update"}</>
      )}
    </button>
  );
};

export default SubmitButton;

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      className="py-3 text-sm bg-gray-50 w-full rounded-bl-md hovergray-100 text-center"
      href={`/edit/${id}`}
    >
      edit
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const deletImageWithId = deleteImage.bind(null, id);
  return (
    <form
      action={deletImageWithId}
      className="py-3 text-sm bg-gray-50 w-full rounded-br-md hovergray-100 text-center"
    >
      <DeleteBtn />
    </form>
  );
};

const DeleteBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
};
