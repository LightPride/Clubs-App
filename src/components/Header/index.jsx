import { NavLink } from 'react-router-dom';
import logo from '@assets/logo/logo.png';

export function Header() {
  return (
    <header className="header">
      <nav className="navigation">
        <img src={logo} alt="" className="navigation__logo" />
        <ul className="navigation__list">
          <li>
            <NavLink className="navigation__link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navigation__link" to="/clubs" data-nav>
              Catalogue
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
