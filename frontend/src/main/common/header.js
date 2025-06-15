import LogoutButton from './logoutButton';
import { FILLER as F } from '../../utils';

export const Header = () => {
  const authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
  const fullName = `${authData.first_name} ${authData.last_name}`;
  const role = authData.role;
  const email = authData.email
  return (
    <div className="header">
      <span>
        {role} | {fullName} | {email}
      </span>
      <LogoutButton />
    </div>
  );
};
