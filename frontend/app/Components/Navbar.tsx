"use client";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { client } from "../client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";

const navItems = [
  { name: "All Pokémon", path: "/" },
  { name: "My Collection", path: "/Collection" },
  { name: "Evolution Guide", path: "/#evolution" },
  { name: "Marketplace", path: "/Marketplace" },
  { name: "Battle Arena", path: "/Battle" },
];

const NavBar = () => {
  const navContainerRef = useRef(null);
  const pathname = usePathname();

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show or hide the navigation bar based on scroll position
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      //@ts-ignore
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      //@ts-ignore
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      //@ts-ignore
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate the navigation bar
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed bg-foreground inset-x-0 top-4 z-50 h-16 border border-border backdrop-blur-md transition-all duration-700 sm:inset-x-6 rounded-xl shadow-lg"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWefVdmgKi7EViZAlTSIRDg1u59bTUkEsxHA&s"
              alt="PokeVault"
              className="w-10 rounded-full border border-muted"
            />
            <span className="text-background font-bold text-lg hidden md:block">
              PokeVault
            </span>
          </Link>

          {/* Navigation Links and Connect Button */}
          <div className="flex h-full items-center gap-3">
            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? "bg-white/30 font-semibold text-background"
                      : "text-background/80 hover:bg-white/20"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Connect Wallet */}
            <ConnectButton
              client={client}
              appMetadata={{
                name: "PokeVault",
                url: "https://pokeevolve.com",
              }}
              theme="light"
              connectModal={{
                titleIcon: "",
                welcomeScreen: {
                  title: "Welcome to PokeEvolve",
                  subtitle: "Catch Your Pokémon Evolve in Higher Form",
                  img: {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWefVdmgKi7EViZAlTSIRDg1u59bTUkEsxHA&s",
                    width: 300,
                    height: 50,
                  },
                },
              }}
            />

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="bg-muted/20 hover:bg-muted ml-2 p-2"
              >
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-background"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
