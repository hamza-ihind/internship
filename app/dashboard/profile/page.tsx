"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas/profile";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(profileSchema) });
  const onSubmit = async (data: FormData) => {
    console.log(data);
  };
  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm">University</label>
          <input className="mt-1 w-full rounded-md border p-2" {...register("university")} />
          {errors.university && <p className="text-sm text-red-600">{errors.university.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Faculty</label>
          <input className="mt-1 w-full rounded-md border p-2" {...register("faculty")} />
        </div>
        <div>
          <label className="block text-sm">Degree</label>
          <input className="mt-1 w-full rounded-md border p-2" {...register("degree")} />
        </div>
        <div>
          <label className="block text-sm">Skills (comma separated)</label>
          <input className="mt-1 w-full rounded-md border p-2" {...register("skills")} />
        </div>
        <Button type="submit" disabled={isSubmitting}>Save</Button>
      </form>
    </main>
  );
}