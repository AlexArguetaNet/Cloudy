import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";

export const Navbar = (props: 
    { 
        city: string , 
        setCity: React.Dispatch<React.SetStateAction<string>>
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    }) => {

    return (
        <div className="navbar container">
            <div className="links">
                <h2>Cloudy <FontAwesomeIcon icon={faSun}/></h2>
                <form action="" onSubmit={(event) => props.onSubmit(event)}>
                    <input type="text" value={props.city} onChange={(event) => props.setCity(event.target.value)} placeholder="Enter city"/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
            </div>
        </div>
    );
}