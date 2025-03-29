"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner"

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const authFromSchema = (type: FormType) =>{
   return z.object({
    name:type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
   })
} 

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFromSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),  
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   try {
    if(type === "sign-up"){
      console.log("SIGN UP", values);

    }else{
      console.log("SIGN IN", values);
    }
   } catch (error) {
    console.log(error)
    toast.error(`There was an error: ${error}`);
   }
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            <Button type="submit" className="btn">
              {isSignIn ? "Sign in" : "Create an account"}{" "}
            </Button>
          </form>
        </div>
      </Form>
      <p className="text-center">
        {isSignIn ? "No account yet ?" : "Have an account already ?"}{" "}
        <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">{!isSignIn ? "Sign in" : "Sign up"} </Link>
      </p>
    </div>
  );
};

export default AuthForm;
