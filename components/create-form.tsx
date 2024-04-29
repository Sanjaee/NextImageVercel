"use client";

import { uplodeImage } from "@/lib/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./Button";

const CreateForm = () => {
  const [state, formActions] = useFormState(uplodeImage, null);
  return (
    <form action={formActions}>
      <div className="mb-4 pt-2">
        <input
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          type="text"
          name="title"
          placeholder="title"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-red-500 text-sm mt-2">{state?.error?.title}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-2 file:mr-4
       file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full
       "
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-red-500 text-sm mt-2">{state?.error?.image}</p>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <SubmitButton label="uplode" />
      </div>
    </form>
  );
};

export default CreateForm;
