import { SignIn as ClerkSignInPage } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center flex-grow">
      <ClerkSignInPage />
    </div>
  );
};

export default SignIn;
