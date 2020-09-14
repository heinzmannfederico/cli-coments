import React from "react";

const Header = () => {
  return (
    <div className="sm:flex sm:justify-between mb-6">
      <p className="mr-2 mb-5 lg:mb-0">
        {"Roger"} {"App"}
      </p>
      <p className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
        {"Abm Comentarios"}
      </p>
    </div>
  );
};

export default Header;
