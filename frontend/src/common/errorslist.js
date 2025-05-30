export const ErrorsList = ({ errors }) => {
  if(typeof errors === 'undefined') {
    return <></>;
  }
  if (!errors) {
    return <></>;
  }
  return (
    <div>
      <br />
      <ul className="error-messages">
        {Object.keys(errors).map(key => (
          <li key={key}>
            {key} : {errors[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};
