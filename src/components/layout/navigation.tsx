import Image from "next/image";
import { assets } from "@/assets";
import { ButtonLink } from "@/components/ui/button-link";

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
    <header className="mx-auto max-w-[75rem] rounded-3xl border border-primary-400 p-3 pl-6 backdrop-blur-[2px]">
      <nav className="flex items-center justify-between gap-4">
        <figure className="relative flex items-center justify-start gap-2">
          <div className="flex h-9 w-10 items-center justify-center rounded-xl border border-accent-100 bg-[#052F35] px-2 py-1.5">
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

        <ul className="flex items-center justify-center gap-4 font-nanum">
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
