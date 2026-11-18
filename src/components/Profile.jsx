import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-132px)]">
      {user && <EditProfile user={user} />}
    </div>
  );
};

export default Profile;
