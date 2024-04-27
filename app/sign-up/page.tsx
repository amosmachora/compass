"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Inputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const form = useForm<Inputs>();
  const { register, handleSubmit } = form;
  const { toast } = useToast();

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email: emailAddress, password } = data;
    if (!isLoaded) {
      return;
    }

    try {
      toast({
        title: "Signing you up.",
        description: "We are creating your compass account 🚀",
      });

      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast({
        description: "You are signed up ✅",
      });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      toast({
        description: "Finishing up 🏁",
      });
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          description: "You are compassed 🧭",
        });
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        {pendingVerification && (
          <form className="border p-5 rounded">
            <Input
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <Button onClick={onPressVerify}>Verify Email</Button>
          </form>
        )}
        {!pendingVerification && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto grid w-[350px] gap-6"
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Welcome to compass. Sign up for a free account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  signUp.authenticateWithRedirect({
                    strategy: "oauth_google",
                    redirectUrl: "/",
                    redirectUrlComplete: "/",
                  });
                }}
              >
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account ?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default SignUp;
