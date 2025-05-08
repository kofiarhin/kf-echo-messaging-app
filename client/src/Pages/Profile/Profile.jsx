import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="heading">Welcome {user?.name} </h1>
    </div>
  );
};

export default Profile;
