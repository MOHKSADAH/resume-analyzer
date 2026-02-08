import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
    const { auth } = usePuterStore();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <span className="text-2xl font-bold text-blueprint-accent">Resumai</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/faq" className="nav-link">
                    FAQ
                </Link>
                {auth.isAuthenticated && (
                    <Link to="/wipe" className="nav-link">
                        Data
                    </Link>
                )}
                <Link to="/upload" className="btn-primary btn-md">
                    Upload Resume
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
