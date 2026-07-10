import React from "react";
import Link from "next/link";
import "../globals.css";

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-extrabold text-primary sm:text-5xl">
            AI Course Generator
            <strong className="font-extrabold sm:block text-black">
              {" "}
              Custom Learning Paths, Powered By AI.
            </strong>
          </h1>

          <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
            Unlock the full potential of AI-driven course creation. Build
            learning paths that adapt to your interests and progress, delivering
            a truly customized education experience.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              href="/sign-in"
              className="inline-block rounded border border-primary bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
