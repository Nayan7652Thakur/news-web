"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Top-Headline", path: "/" },
    { name: "Business", path: "/news/business" },
    { name: "Sports", path: "/news/sports" },
    { name: "Technology", path: "/news/technology" },
    { name: "Entertainment", path: "/news/entertainment" },
    { name: "Science", path: "/news/science" },
    { name: "General", path: "/news/general" },
  ];

  return (
    <div className="flex justify-between items-center px-5 py-9 bg-black text-white shadow-md relative z-50">
      <h2 className="font-bold text-2xl text-white">News</h2>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}  // Use `to` instead of `href`
            className="text-gray-300 hover:text-white lg:text-lg transition"
          >
            {item.name}
          </Link>
        ))}
      </ul>

      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-zinc-900 flex flex-col gap-4 px-6 py-4 md:hidden shadow-lg transition-all duration-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}  // Use `to` here as well
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-base border-b border-zinc-700 pb-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
