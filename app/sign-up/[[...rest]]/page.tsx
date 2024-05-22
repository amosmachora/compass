import { SignUp as ClerkSignUpPage } from "@clerk/nextjs";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center flex-grow">
      <ClerkSignUpPage />;
    </div>
  );
};

export default SignUp;
