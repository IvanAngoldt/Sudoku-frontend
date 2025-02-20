import { useEffect, useState, useRef } from 'react';
import { ReactComponent as BellIcon } from '../../icons/bell.svg';
import './Notifications.css';

const Notifications = ({ userId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (showDropdown) {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="notifications" ref={dropdownRef}>
      <div className="notification-icon" onClick={toggleDropdown}>
        <BellIcon />
      </div>
      {showDropdown && (
        <div className="notification-dropdown">
            <div className="no-notifications">No new notifications</div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
