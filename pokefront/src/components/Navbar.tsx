import React from 'react';
import { useAuth } from '../sessionContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { sessionToken, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOff = () => {
    // Call the signOut function
    signOut();
    // Redirect to the home page ("/")
    navigate('/');
  };

  return (
    <header>
      <div className='nav-div'>
        <nav className='main-nav'>
          <div>
            <Link className='main-link' to={sessionToken ? '/catcher' : '/'}>
              PokéCatcher
            </Link>
          </div>
          <div>
            {/* Always display these links, regardless of login status */}
            <Link className='collection-link' to={sessionToken ? '/collection' : '/'}>
              Collection
            </Link>
            <Link className='profile-link' to={sessionToken ? '/profile' : '/'}>
              Profile
            </Link>

            {/* Conditionally render the Log Off button if the user is logged in */}
            {sessionToken && (
              <button onClick={handleLogOff} className='log-off-button'>
                Log Off
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
