import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/savedRecipies">Heart</Link>
                        </li>
                    </ul>
                </nav>
                <h1>Foodie's Cookbook!</h1>
            </div>
        </header>

    )
}

export default Header;