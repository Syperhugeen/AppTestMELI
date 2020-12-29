import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/layouts/components/Header.scss";
import logoX1 from "../../assets/Imagenes/Corporativas/Logo_ML.png";
import logoX2 from "../../assets/Imagenes/Corporativas/Logo_ML@2x.png";
import Buscador from "./Buscador";
const Header = (props) => {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 800;

	useEffect(() => {
		window.addEventListener("resize", () => setWidth(window.innerWidth));
		/* Le paso el [width] para que solo se renderee cuando el width cambia. */
	}, [width]);

	return (
		<header className="w-100 bg-primary py-1 py-lg-2">
			<div className="container d-flex flex-column align-items-center">
				<div className="col col-lg-10 row mx-0 ">
					<div className="col-2  col-lg-1 d-flex flex-column align-items-center justify-content-center px-1">
						<Link to="/">
							<img
								src={width > breakpoint ? logoX2 : logoX1}
								className="header-logo img-fluid "
								alt="Logo de Mercado Libre"
							/>
						</Link>
					</div>
					<Buscador />
				</div>
			</div>
		</header>
	);
};

export default Header;
