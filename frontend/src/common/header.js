import LogoutButton from "./logoutButton";
import { UserinfoHeader } from "./userinfoHeader";

export const Header = () => {
  return (
    <div className="header">
      <div>
        <UserinfoHeader />
      </div>
      <br />
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};