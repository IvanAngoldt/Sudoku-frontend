import "./ProfilePage.css";

const ProfilePage = () => {
    return (
        <div>
        <div className="profile-container">
          <div className="profile-header">
            <h1>Profile</h1>
          </div>
          <div className="profile-info">
            <h2>Username: </h2>
            <h3>Email: </h3>
          </div>
          <div className="profile-posts">
            <h2>My Blogs</h2>
          </div>
        </div>
      </div>
      );
  };
  
  export default ProfilePage;