
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="site-header">
            <div className="brand">
                <span className="brand-indicator"></span>

                <div>
                    <h1>IRON SIGHT CODEX</h1>
                    <p>// DIGITAL FIREARMS ARCHIVE</p>
                </div>
            </div>

            <nav className="site-nav">
                <NavLink to="/" end>
                    HOME
                </NavLink>

                <NavLink to="/archive">
                    ARCHIVE
                </NavLink>

                <NavLink to="/add-collection">
                    ADD COLLECTION
                </NavLink>
            </nav>
        </header>
    )
}

export default Header
