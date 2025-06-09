import Image from "next/image";
import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full shadow-md">
      <div className="flex flex-row items-center w-full bg-white">
        <div className="flex-shrink-0">
          <Image
            src="/krys-logo.png"
            width={80}
            height={80}
            alt="Logo Krys"
          />
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Ouvert 6J / 7
          </h1>
        </div>
      </div>

      <nav className="bg-black text-white w-full">
        <div className="flex justify-around items-center family-istek">
          <Link 
            href="/homme" 
            className="px-8 py-3 hover:bg-gray-800 transition-colors duration-200"
          >
            HOMME
          </Link>
          <Link 
            href="/femme" 
            className="px-8 py-3 hover:bg-gray-800 transition-colors duration-200"
          >
            FEMME
          </Link>
          <Link 
            href="/enfant" 
            className="px-8 py-3 hover:bg-gray-800 transition-colors duration-200"
          >
            ENFANT
          </Link>
          <Link 
            href="/solaire" 
            className="px-8 py-3 hover:bg-gray-800 transition-colors duration-200"
          >
            SOLAIRE
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;