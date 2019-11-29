import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
	return (
		<div className="cont_column">
			<div className="cont_row cont_navBar">
				<NavLink
					to="/"
					exact
					activeStyle={{ color: "#1a237e", textDecoration: "none" }}
					className="element_navBar element_left"
				>
					Search
				</NavLink>
				<NavLink
					to="/bookmarks"
					exact
					activeStyle={{ color: "#1a237e", textDecoration: "none" }}
					className="element_navBar"
				>
					Bookmarks
				</NavLink>
			</div>
			<div className="cont_column cont_header">
				<h1>GitHub repo searcher</h1>
			</div>
		</div>
	);
}

export default Header;
