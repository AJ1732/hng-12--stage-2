"use client";
import Image from "next/image";
import { useMultiForm } from "@/provider/multiform";
import { assets } from "@/assets";

const StepThree: React.FC = () => {
  const { form } = useMultiForm();

  const { name, email, number_of_tickets, profile_photo, ticket_type } =
    form.getValues();

  return (
    <section className="">
      <header className="space-y-3 text-center max-md:text-left md:space-y-4">
        <h2 className="text-2xl font-semibold leading-normal md:text-[2rem]">
          Your Ticket is Booked!
        </h2>
        <p className="leading-6">
          You can download or Check your email for a copy
        </p>
      </header>

      <div className="pt-8 md:px-5">
        <div className="relative mx-auto aspect-[2.82] size-full overflow-hidden">
          <div className="relative z-[1] flex h-full flex-col justify-between p-1 sm:px-2.5 sm:py-3">
            <div className="flex max-w-[83%] items-start justify-start gap-4">
              <figure className="relative left-1.5 top-1.5 aspect-[1.05] min-w-[32%] max-w-[30%] overflow-hidden rounded-[0.35156rem]">
                {profile_photo && (
                  <Image
                    src={profile_photo}
                    alt="profile image"
                    fill
                    className="absolute rounded-[0.35156rem]"
                  />
                )}
              </figure>

              <div className="relative max-md:py-3.5">
                <h3 className="px-2 font-road-rage text-2xl sm:text-4xl md:mb-1 md:text-5xl">
                  Techember <br className="max-md:hidden" /> Fest ”25
                </h3>
                <p className="text-xs font-light leading-normal sm:text-sm md:text-base">
                  📍 04 Rumens road, Ikoyi, Lagos
                </p>
                <p className="text-xs font-light leading-6 sm:text-sm md:text-base">
                  📧 {email}
                </p>
                {ticket_type && (
                  <Image
                    src={assets[`${ticket_type}-icon`]}
                    alt="ticket type"
                    width={40}
                    height={40}
                    className="absolute -right-[30%] top-0 -z-[2] w-[44%] sm:-right-[40%] md:sm:-right-[36%] lg:-right-[20%]"
                  />
                )}
              </div>
            </div>

            <p className="-mb-1 text-xs font-black text-accent-100 sm:-mb-2.5 sm:text-sm">
              Ticket for {number_of_tickets} entry only
            </p>
          </div>

          <Image
            src={assets["ticket-png"]}
            alt="ticket image"
            fill
            className="absolute inset-0 mx-auto"
          />

          <div className="absolute right-[-9%] top-[36%] flex max-h-[4rem] w-full max-w-[33%] -rotate-90">
            {ticket_type && (
              <Image
                src={assets[`${ticket_type}-icon`]}
                alt="ticket type"
                width={40}
                height={40}
                className="w-[44%]"
              />
            )}

            <div className="flex flex-col justify-center">
              <p className="font-road-rage text-xs md:text-lg">
                Techember Fest ”25
              </p>
              <p className="line-clamp-1 text-sm font-light leading-normal md:text-base">
                {name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
