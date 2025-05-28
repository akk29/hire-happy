export const ErrorsList = ({ errors }) => {
  if (!errors) {
    return <div></div>;
  }
  return (
    <div>
      <br />
      <ul className="error-messages">
        {Object.keys(errors).map((key) => (
          <li key={key}>
            {key} : {errors[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};