import React from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export const meta = () => [
  { title: "Resumai - Authentication" },
  {
    name: "description",
    content: "Login or register to access your resume analysis and feedback.",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rawNext = searchParams.get("next") || "/";
  const next = rawNext.startsWith("/") ? rawNext : "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, isLoading, next, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="border border-blueprint-line rounded-2xl shadow-lg max-w-2xl w-full">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-12 max-sm:p-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-5xl max-sm:text-4xl">Welcome</h1>
            <p className="text-xl text-blueprint-text-muted font-medium">Login to Continue Your Job Journey</p>
          </div>
          <div className="flex justify-center mt-4">
            {isLoading ? (
              <button className="auth-button animate-pulse" disabled>
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    Logout
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    Login with Puter
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
