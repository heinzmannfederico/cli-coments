import React from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <title>CRM - Administración de Clientes</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </header>
      <div className="bg-gray-200 min-h-screen">
        <main className="sm:w-3/3 xl:w-5/5 sm:min-h-screen p-5">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
