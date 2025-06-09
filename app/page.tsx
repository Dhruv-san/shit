"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import GradientText from "@/components/GradientText";
import DecryptedText from "@/components/DecryptedText";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12 relative overflow-hidden">
      {/* Minimal blue accent shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-800/30 rounded-full blur-2xl z-0" />
      <div className="flex flex-col items-center gap-6 z-10 relative animate-fade-in w-full max-w-3xl">
        <GradientText className="text-6xl font-extrabold mb-2 tracking-tight animate-slide-down">
          cofindr
        </GradientText>
        <DecryptedText
          text="Find your perfect cofounder."
          className="text-2xl font-semibold text-blue-200 text-center mb-2 animate-slide-up"
          animateOn="view"
        />
        <DecryptedText
          text="Build something amazing, together."
          className="text-xl font-medium text-blue-100 text-center mb-4 animate-slide-up"
          animateOn="view"
        />
        <DecryptedText
          text={
            "Cofindr connects founders, makers, and dreamers looking to launch their next startup. Match with talented cofounders, chat instantly, and discover new projects—your journey starts here."
          }
          className="text-lg text-blue-200 text-center mb-6 animate-fade-in"
          animateOn="view"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
          <Button
            className="w-full py-3 text-lg font-bold rounded-xl bg-blue-700 hover:bg-blue-800 shadow-lg transition-all animate-pop"
            onClick={() => router.push("/dashboard/swipe")}
          >
            Start your search
          </Button>
          <Button
            className="w-full py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 text-black hover:from-yellow-500 hover:to-purple-600 shadow-lg transition-all animate-pop"
            onClick={() => router.push("/login")}
          >
            Join now — it’s free!
          </Button>
        </div>
        {/* Features Section */}
        <div className="mt-10 w-full">
          <h3 className="text-2xl font-bold text-center mb-6 text-white">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <DecryptedText
                text="🔍 Smart Matching"
                className="text-lg font-semibold text-yellow-300 mb-2"
                animateOn="view"
              />
              <DecryptedText
                text="Get matched with cofounders based on your skills, interests, and goals."
                className="text-blue-200 text-center"
                animateOn="view"
              />
            </div>
            <div className="flex flex-col items-center">
              <DecryptedText
                text="💬 Instant Chat"
                className="text-lg font-semibold text-purple-300 mb-2"
                animateOn="view"
              />
              <DecryptedText
                text="Message your matches instantly and start building together."
                className="text-blue-200 text-center"
                animateOn="view"
              />
            </div>
            <div className="flex flex-col items-center">
              <DecryptedText
                text="🚀 Discover Projects"
                className="text-lg font-semibold text-pink-300 mb-2"
                animateOn="view"
              />
              <DecryptedText
                text="Explore new startups and join teams that inspire you."
                className="text-blue-200 text-center"
                animateOn="view"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-blue-200 text-xs opacity-70 text-center z-10 relative animate-fade-in">
        &copy; {new Date().getFullYear()} Cofindr. All rights reserved.
      </div>
      {/* Custom CSS Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes slide-down {
          0% {
            opacity: 0;
            transform: translateY(-60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 1.1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 1.1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          80% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pop {
          animation: pop 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
}