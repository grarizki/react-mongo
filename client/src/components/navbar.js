import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand mx-sm-2" to="/">
                    <img style={{ "width": 25 + '%' }} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
                </NavLink>
                <div className="collapse navbar-collapse position-absolute top-0 end-0 d-flex align-items-center" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                            <NavLink className="nav-link " to="/create">
                                <button class="rounded btn-success text-white fw-bold px-2 py-2 mt-sm-2">Add New Employee</button>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}