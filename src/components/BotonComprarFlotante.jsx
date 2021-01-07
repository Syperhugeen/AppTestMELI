import React, { useState, useEffect, useRef } from "react";

import "../assets/css/components/BotonComprarFlotante.scss";

const BotonComprarFlotante = (props) => {
	const prevScrollY = useRef(0);
	const [goingUp, setGoingUp] = useState(false);
	const [muestra, setMuestra] = useState(false);

	const item = props.item;

	let getNameArreglado = (name) => {
		const lengthIdeal = 30;
		if (name.length > lengthIdeal) {
			return name.slice(0, lengthIdeal) + " ...";
		} else {
			return name;
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > 0) {
				const bodyRect = document.body.getBoundingClientRect(),
					elemRect = document
						.getElementById("boton-comprar")
						.getBoundingClientRect(),
					offset = elemRect.top - bodyRect.top;

				let bottomOfWindow = document.documentElement.scrollTop >= offset;

				if (bottomOfWindow) {
					setMuestra(true);
				} else {
				}
			} else {
				setMuestra(false);
			}

			if (prevScrollY.current < currentScrollY && goingUp) {
				setGoingUp(false);
			}
			if (prevScrollY.current > currentScrollY && !goingUp) {
				setGoingUp(true);
			}

			prevScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [goingUp]);

	return (
		<div className="w-100 boton-flotante-header d-flex flex-column align-items-center">
			{muestra && (
				<div className="container d-flex flex-column align-items-center">
					<div className="col col-lg-10 bg-white">
						<div className="row mx-0 align-items-center">
							<div className="col-3  d-flex flex-column align-items-center">
								<img
									src={item.thumbnail}
									alt={`Foto de ${item.title}`}
									className="item-lista-img img-fluid"
								/>
							</div>
							<div className="col-4 h6">{getNameArreglado(item.title)}</div>
							<div className="col-5 ">
								<button className="item-boton">Comprar</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BotonComprarFlotante;
