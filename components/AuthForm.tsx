"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";



import { z } from "zod";
import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});



const AuthForm = ({type}:{type:FormType}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
     <Form {...form}>
  <div className="flex flex-col gap-6 card py-14 px-10">
    <div className="flex flex-row gap-2 justify-center">
      <Image src="/logo.svg" alt="logo" height={32} width={32} />
      <h2 className="text-primary-100">Interviewer</h2>
    </div>
    <h3>Practice the job interviews with AI</h3>

    {/* Ensure form is properly structured */}
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-6 mt-4 form">
      {!isSignIn && <p>Name</p>}
      <Button type="submit">Submit</Button>
    </form>
  </div>
</Form>

    </div>
    
  );
};

export default AuthForm;
