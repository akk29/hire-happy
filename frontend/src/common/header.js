import LogoutButton from './logoutButton';
import { UserinfoHeader } from './userinfoHeader';

export const Header = () => {
  return (
    <div className="header">
      <UserinfoHeader />
      <LogoutButton />
    </div>
  );
};
