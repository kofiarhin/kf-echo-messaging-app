import useUsers from "../../hooks/useUsers";
import UserUnit from "../../components/UserUnit/UserUnit";
import "./users.styles.scss";

const Users = () => {
  const { data: usersData, isLoading, isEror } = useUsers();
  if (isLoading)
    return (
      <>
        {" "}
        <h1 className="heading">Loading....</h1>{" "}
      </>
    );
  return (
    <div className="users-wrapper">
      {usersData?.map((user) => (
        <UserUnit data={user} key={user._id} />
      ))}
    </div>
  );
};

export default Users;
