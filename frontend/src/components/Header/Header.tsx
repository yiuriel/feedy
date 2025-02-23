import { AnalyticsButton } from "./AnalyticsButton";
import { FormsButton } from "./FormsButton";
import { LogoutButton } from "./LogoutButton";
import { ProfileButton } from "./ProfileButton";
import { CreateFormButton } from "./CreateFormButton";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm z-10 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/app/dashboard")}
          >
            Feedy
          </h1>
        </div>
        <div className="flex items-center gap-x-2">
          <FormsButton />
          <AnalyticsButton />
          <ProfileButton />
          <CreateFormButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
