import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/icons/SocialIcons";

const FOOTER_CATEGORIES = ["All", "Electronics", "Clothing", "Home"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#002e63] text-blue-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Filters</h3>
          <ul className="space-y-2 text-sm">
            {FOOTER_CATEGORIES.map((category) => (
              <li key={category}>
                <Link href="/" className="hover:text-white">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0758a8] hover:bg-[#0a63bd]"
            >
              <FacebookIcon className="h-4 w-4 text-white" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0758a8] hover:bg-[#0a63bd]"
            >
              <TwitterIcon className="h-4 w-4 text-white" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0758a8] hover:bg-[#0a63bd]"
            >
              <InstagramIcon className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#01356e] py-4 text-center text-xs text-blue-200">
        &copy; {year} WhatbytesStore. All rights reserved.
      </div>
    </footer>
  );
}
