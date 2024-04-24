import HeaderLogo from './images/react_header.jpg'
import './Header.css'
function Header() {
    return (
        <header>
            <div>
                <img className="react-logo" src={HeaderLogo} alt="react-logo" />
            </div>
            <div>
                <h3>Welcome to my slide vision React app</h3>
            </div>
        </header>
    );
}
export default Header