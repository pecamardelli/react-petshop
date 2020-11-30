import React  from 'react';
import { Link, NavLink }	from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBar(props) {
	return (
		<div className="nav-container">
			<nav className="nav-wrapper">
				<Link to="/">
					<img
						src={logo}
						height="50"
						alt=""
						loading="lazy"
					/>
				</Link>
				<div>
					<ul key="1" >
						<NavLink to="/search">
							Search
						</NavLink>
					</ul>
					<ul key="2" >
						<NavLink to="/edit">
							Edit
						</NavLink>
					</ul>
					<ul key="3" >
						<NavLink to="/about">
							About
						</NavLink>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;