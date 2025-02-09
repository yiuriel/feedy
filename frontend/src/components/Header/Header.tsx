import { LogoutButton } from "./LogoutButton";
import { ProfileButton } from "./ProfileButton";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm z-10 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/app/dashboard")}
        >
          Feedy
        </h1>
        <div className="flex items-center gap-x-2">
          <ProfileButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
