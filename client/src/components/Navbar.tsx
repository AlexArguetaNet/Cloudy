import "../styles/Navbar.css";

export const Navbar = () => {

    return (
        <div className="navbar">
            <h2>Cloudy</h2>
            <div className="links">
                <form action="">
                    <input type="text" />
                    <button>Search</button>
                </form>
            </div>
        </div>
    );
}