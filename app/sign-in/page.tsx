import { SignIn as ClerkSignInPage } from "@clerk/nextjs";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  return <ClerkSignInPage />;
};

export default SignIn;
