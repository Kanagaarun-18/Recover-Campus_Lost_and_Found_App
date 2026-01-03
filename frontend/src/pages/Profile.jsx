import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page" style={{ padding: "30px" }}>
      <h2>Profile</h2>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
      <p>Here you can add more profile settings and preferences.</p>
    </div>
  );
};

export default Profile;
