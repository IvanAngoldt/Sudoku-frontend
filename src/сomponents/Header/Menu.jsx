import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import Avatar from '../Avatar/Avatar';
import './Menu.css';

const Menu = () => {
  const { user, loading } = useAuthUser();

  

  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setMenuOpen(true);
  };
  
  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  const openModal = () => {
    setMenuOpen(false);
    setIsModalOpen(true);
  }

  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  if (loading) return null;

  return (
    <div
      className="header-avatar"
      onMouseEnter={handleMouseEnter} // Открытие при наведении
      onMouseLeave={handleMouseLeave} // Закрытие при выходе
      ref={dropdownRef}
    >

      <div className='avatar'>
        <div className='avatar-menu'>
          <Avatar isEditing={false} />
        </div>
        
        <svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z"
            fill="#fff"
            fillRule="evenodd"
          />
        </svg>
      </div>

      <div className={`header-menu ${menuOpen ? 'open' : ''}`}>
        <div className="header-menu-item username">
          <div>{user?.email || "unknown"}</div>
        </div>
    
        <Link to="profile" className="header-menu-item">
          <FaUser /> {/* Profile icon */}
          My Profile
        </Link>

        <button className="header-menu-item" onClick={openModal}>
          <FaSignOutAlt /> {/* Logout icon */}
          Logout
        </button>
      </div>
  
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-container">
            <div className="modal-content">
              <p>Вы уверены, что хотите выйти?</p>
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleLogout}>
                  Подтвердить
                </button>
                <button className="cancel-button" onClick={closeModal}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;