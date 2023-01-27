import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            <h1>asdasdsa</h1>

            <ul>
                <li>
                    <Link to="/">Come home</Link>
                </li>
                <li>
                    <Link to="/new">Create new Task!</Link>
                </li>
            </ul>

        </div>
    )
}

export {Navbar}