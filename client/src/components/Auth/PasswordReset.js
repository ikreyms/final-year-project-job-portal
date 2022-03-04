import { useParams } from "react-router-dom";

const PasswordReset = () => {
  const params = useParams();

  console.log(params);

  return <div>PasswordReset</div>;
};

export default PasswordReset;
