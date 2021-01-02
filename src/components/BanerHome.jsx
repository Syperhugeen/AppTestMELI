import React, { useState, useEffect } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Axios from "axios";

import urlApiMeliPath from "../config/config";

import CategoriaCabecera from "../components/CategoriaCabecera";
import { shuffleArrayAndReduce } from "../helpers/functions";

const BanerHome = () => {
	const [loadingCategorias, setLoadingCategorias] = useState(false);
	const [categorias, setCategorias] = useState([]);
	const [errorBool, setErrorBool] = useState(false);

	const fetchCategorias = () => {
		setLoadingCategorias(true);

		return Axios(urlApiMeliPath.pathCategoriasDelSitio)
			.then(function (response) {
				let data = response.data;

				setCategorias(shuffleArrayAndReduce(data.categories, 12));

				setLoadingCategorias(false);
			})
			.catch(function (error) {
				setLoadingCategorias(false);
				setErrorBool(true);
			});
	};

	useEffect(() => {
		fetchCategorias();
	}, []);

	return (
		<div className="container mt-5 mb-3 d-flex flex-column align-items-center">
			<div className="col-12 col-lg-10">
				{loadingCategorias && (
					<div className="col-10 my-5 ">
						<SkeletonTheme>
							<div className="w-100 mb-5 ">
								<Skeleton count={5} />
							</div>
							<div className="w-100 mb-5 ">
								<Skeleton count={5} />
							</div>
							<div className="w-100 mb-5 ">
								<Skeleton count={5} />
							</div>
							<div className="w-100 mb-5 ">
								<Skeleton count={5} />
							</div>
						</SkeletonTheme>
					</div>
				)}
				{categorias.length > 0 && !loadingCategorias && (
					<div className="row mx-0">
						{categorias.map((cateogira) => {
							return (
								<CategoriaCabecera
									categoria={cateogira}
									key={`header${cateogira.id}`}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default BanerHome;
