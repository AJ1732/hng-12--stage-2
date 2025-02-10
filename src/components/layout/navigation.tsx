import Image from "next/image";
import { assets } from "@/assets";
import { ButtonLink } from "@/components";

const navlinks = [
  {
    name: "event",
    link: "/events",
  },
  {
    name: "my tickets",
    link: "/tickets",
  },
  {
    name: "about project",
    link: "/about",
  },
];

const Navigation = () => {
  return (
    <header className="border-primary-400 mx-auto max-w-[75rem] rounded-full border p-3 pl-6 backdrop-blur-[2px]">
      <nav className="flex items-center justify-between gap-4">
        <figure className="relative flex items-center justify-start gap-2">
          <div className="border-accent-100 flex h-9 w-10 items-center justify-center rounded-xl border bg-[#052F35] px-2 py-1.5">
            <Image
              src={assets["logo-ticket"]}
              alt="ticz logo"
              width={24}
              height={24}
              className="aspect-square min-h-6"
            />
          </div>

          <Image
            src={assets["logo-watermark"]}
            alt="ticz"
            width={44}
            height={23}
          />
        </figure>

        <ul className="font-nanum flex items-center justify-center gap-4">
          {navlinks.map(({ name, link }) => (
            <li
              key={link}
              className="cursor-pointer p-2.5 text-lg capitalize text-[#B3B3B3] transition-colors duration-200 ease-in-out hover:text-white"
            >
              {name}
            </li>
          ))}
        </ul>

        <ButtonLink link="/tickets">MY TICKETS</ButtonLink>
      </nav>
    </header>
  );
};

export default Navigation;
