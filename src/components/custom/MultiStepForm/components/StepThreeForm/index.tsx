"use client";
import Image from "next/image";
import { useMultiForm } from "@/provider/multiform";

const StepThree: React.FC = () => {
  const { form } = useMultiForm();

  const {
    about_project,
    email,
    name,
    number_of_tickets,
    profile_photo,
    ticket_type,
  } = form.getValues();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Submission Successful!</h2>
      <div className="text-wrap">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>About:</strong> {about_project}
        </p>
        <p>
          <strong>Tickets number:</strong> {number_of_tickets}
        </p>

        <figure>
          {profile_photo && (
            <Image
              src={profile_photo}
              alt="profile image"
              width={145}
              height={140}
            />
          )}
        </figure>
        <p>
          <strong>Tickets type:</strong> {ticket_type}
        </p>
      </div>
    </div>
  );
};

export default StepThree;
