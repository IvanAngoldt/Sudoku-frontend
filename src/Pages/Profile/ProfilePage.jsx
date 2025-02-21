import "./ProfilePage.css";

const ProfilePage = () => {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-title">
            <h1>Your Profile</h1>
          </div>
          <div className="profile-info">
            <h2>Username:</h2>
          </div>
          <div className="profile-posts">
            <h2>My Achievements:</h2>
          </div>
        </div>
        {/* вот тут разделитель-полоска */}

        <div className="divider"></div>
        
        <div className="profile-content">
          content
        </div>
      </div>
      );
  };
  
  export default ProfilePage;