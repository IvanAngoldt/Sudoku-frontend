import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = () => {

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
        alert("You Loged out")
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
          closeModal();
        }
    };

    return (
        <div
          className="header-avatar"
          onMouseEnter={handleMouseEnter} // Открытие при наведении
          onMouseLeave={handleMouseLeave} // Закрытие при выходе
          ref={dropdownRef}
        >

          <div className='avatar'>
            <span>N</span>
            <svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </div>

          <div className={`header-menu ${menuOpen ? 'open' : ''}`}>
          <div className="header-menu-item username">
            email
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
    
          {/* Модальное окно с подтверждением */}
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