"use server";
import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImageById } from "./data";

const uplodeSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "image is required",
    })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "image must be an image",
    })
    .refine((file) => file.size < 400000, {
      message: "image must be less than 4mb",
    }),
});

const EditSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "image must be an image",
    })
    .refine((file) => file.size < 400000, {
      message: "image must be less than 4mb",
    })
    .optional(),
});

export const uplodeImage = async (prevState: unknown, formData: FormData) => {
  const validateFields = uplodeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { title, image } = validateFields.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.uplode.create({
      data: {
        title,
        image: url,
      },
    });
  } catch (error) {
    return { message: "Something went wrong" };
  }

  revalidatePath("/");
  redirect("/");
};
// update image
export const updateImage = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validateFields = EditSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }
  const data = await getImageById(id);
  if (!data) {
    return { message: "NOT FOUND" };
  }
  const { title, image } = validateFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await prisma.uplode.update({
      data: {
        title,
        image: imagePath,
      },
      where: {
        id,
      },
    });
  } catch (error) {
    return { message: "failed to update image data" };
  }

  revalidatePath("/");
  redirect("/");
};

// delete image
export const deleteImage = async (id: string) => {
  const data = await getImageById(id);
  if (!data) {
    return { message: "NOT FOUND" };
  }

  await del(data.image);

  try {
    await prisma.uplode.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { message: "fAILED TO DELETE" };
  }
  revalidatePath("/");
};
