import { FILLER as F } from '../utils';

export const UserinfoHeader = () => {
  const authData = JSON.parse(localStorage.getItem(F.AUTH_DATA));
  const fullName = `${authData.first_name} ${authData.last_name}`;
  const role = authData.role;
  const email = authData.email;
  return (
    <span>
      {role} | {fullName} | {email}
    </span>
  );
};
