import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-foreground mb-4">
              PokeVault
            </h3>
            <p className="text-sm mb-4">
              Collect, evolve, and trade unique Pokémon-inspired NFTs on our
              blockchain platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/gauravvan"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/Marketplace"
                  className="hover:text-foreground transition-colors"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="/#evolution"
                  className="hover:text-foreground transition-colors"
                >
                  Evolution Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#evolution"
                  className="hover:text-foreground transition-colors"
                >
                  How to Mint
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for exclusive drops and evolution
              events.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 PokeVault. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="https://linktr.ee/harshshuklaweb3"
                className="text-sm hover:text-foreground transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
