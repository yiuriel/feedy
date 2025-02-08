import { Outlet } from "react-router";
import { useAuthUser } from "../../hooks/useAuthUser";
import { Header } from "../Header/Header";
import { Loading } from "../Loading";

export const PrivateAppLayout = () => {
  const { isLoadingUser } = useAuthUser();

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-grow container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
