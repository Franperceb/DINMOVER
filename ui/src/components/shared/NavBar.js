import React from 'react';
import imageLogo from '../../images/dinmover_logo.png';

function NavBar() {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper white">
          <img src={imageLogo} width="90px" height="100%" alt="imageLogo" />
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html" className="purple-text text-darken-4">
                Encuentra tu casa
              </a>
            </li>
            <li>
              <a href="badges.html " className="purple-text text-darken-4">
                Vende tu casa
              </a>
            </li>
            <li>
              <a
                href="collapsible.html"
                className="purple-text text-purple text-darken-4"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
