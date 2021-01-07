import React, { useState, useEffect } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Axios from "axios";

import urlApiMeliPath from "../config/config";
import validarURL from "../config/validarURL";

import "../assets/css/components/CategoriaCabecera.scss";

import categoriaElse from "../assets/Imagenes/Corporativas/categoriaELSE.png";

const CategoriaCabecera = (props) => {
	const [loading, setLoading] = useState(true);

	const [categoria, setCategoria] = useState(false);

	const fetchCategoria = () => {
		const url = `${urlApiMeliPath.pathCategoriaEspecifica}${props.categoria.id}`;
		setLoading(true);

		console.log(props.categoria.name);

		return Axios.get(url)
			.then(function (response) {
				setCategoria(response.data);

				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchCategoria();
	}, []);

	return (
		<div className="col-3 col-lg-2 ">
			{loading && (
				<div className="col-10 my-5 ">
					<SkeletonTheme>
						<div className="w-100 mb-5 ">
							<Skeleton count={5} />
						</div>
					</SkeletonTheme>
				</div>
			)}
			{categoria !== false && (
				<div className="col-12 mb-2">
					<h2 className="">
						<Link
							className="BreadcrumContainer-a"
							to={`/categoria/${categoria.name
								.toLowerCase()

								.replace(validarURL, "-")}/${categoria.id}`}
						>
							<LazyLoadImage
								src={
									categoria.picture != null ? categoria.picture : categoriaElse
								}
								alt={`Foto de categoria ${categoria.name}`}
								className="img-fluid rounded-circle bg-white categoria-cavecera-contenedor-imagen "
								effect="blur"
							/>
						</Link>
					</h2>
					<Link
						className="BreadcrumContainer-a"
						to={`/categoria/${categoria.name
							.toLowerCase()

							.replace(validarURL, "-")}/${categoria.id}`}
					>
						<p className="text-center mb-0 ">
							<small>{categoria.name}</small>
						</p>
					</Link>
				</div>
			)}
		</div>
	);
};
export default CategoriaCabecera;
