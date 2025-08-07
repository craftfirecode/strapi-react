import React, { useEffect, Suspense, useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { getSettingsData, getStyleSettings } from "~/api/strapi-api";
import { TopBreadcrumb } from "~/components/ui/top-breadcrumb";
import { Footer } from "~/components/ui/footer";
import { Navigation } from "./components/ui/navigation/navigation";

export async function loader() {
  try {
    const [navigation, styles] = await Promise.all([
      getSettingsData(),
      getStyleSettings(),
    ]);

    return {
      navigation,
      styles: styles || null,
    };
  } catch (error) {
    console.error(error);
    return {
      navigation: null,
      styles: null,
    };
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const loaderData: any = useLoaderData<Route.ComponentProps>();
  const isPortfolioPage = /^\/portfolio(\/|$)/.test(location.pathname);
  const isBlogPage = /^\/blog(\/|$)/.test(location.pathname);

  useEffect(() => {
    const checkCookieConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        // Handle case where there is no consent
      } else {
        // Handle case where consent is found
      }
    };
    checkCookieConsent();
  }, [location]);

  const onAccept = (preferences: {}) => {
    // Handle preferences
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark h-[100vh]">
        <div className="flex flex-col h-[100vh]">
          <Navigation data={loaderData.navigation?.top || []} />
          {isPortfolioPage && (
            <div className="container mx-auto my-5">
              <TopBreadcrumb />
            </div>
          )}
          {isBlogPage && (
            <div className="container mx-auto my-5">
              <TopBreadcrumb />
            </div>
          )}
          <div className="flex-1 flex flex-col">{children}</div>
          {/* <Cookie onAccept={(preferences) => onAccept(preferences)}/> */}
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
