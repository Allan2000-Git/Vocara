import { Button } from "@/components/ui/button";
import { ButtonsCard } from "@/components/ui/tailwindcss-buttons";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  const words = [
    {
      text: "Achieve",
    },
    {
      text: "Excellence",
    },
    {
      text: "with",
    },
    {
      text: "Vocara.",
      className: "text-primary dark:text-primary",
    },
  ];

  return (
    <>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col items-center text-center px-2">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-600 py-8">
            Elevate Your Interview Experience
          </p>
          <TypewriterEffect words={words} />
          <div className="mt-10">
          <SignInButton>
            <Button className="inline-flex text-md h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Get started
            </Button>
          </SignInButton>
          </div>
        </div>
      </div>
    </>
  );
}
