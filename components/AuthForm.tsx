"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/Client";
import { signUp, signIn } from "@/lib/actions/auth.actions";

type FormType = "sign-in" | "sign-up";

const authFromSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFromSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully!");

        toast.success("Account created successfully!");
        router.push("/sign-in");

      } else {

        const{email, password} = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredentials.user.getIdToken();

        if(!idToken){
          toast.error("Error signing in");
          return;
        }

        await signIn ({
          email, idToken
        })

        toast.success("Sign in Successfully");
        router.push("/");

        console.log("SIGN IN", values);
        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
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

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </div>
      </Form>
      <p className="text-center">
        {isSignIn ? "No account yet?" : "Have an account already?"}{" "}
        <Link
          href={!isSignIn ? "/sign-in" : "/sign-up"}
          className="font-bold text-user-primary ml-1"
        >
          {!isSignIn ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
