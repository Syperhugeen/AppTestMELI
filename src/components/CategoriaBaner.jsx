import React, { useState, useEffect } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Axios from "axios";

import ItemBloque from "../components/ItemBloque";
import urlApiMeliPath from "../config/config";
import validarURL from "../config/validarURL";

const CategoriaBaner = (props) => {
	const CANTIDAD_ITEMS = 6;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);
	const [items, setItems] = useState([]);

	const fetchItems = () => {
		const url = `${urlApiMeliPath.pathItemsDeCategoria}${props.categoria.id}&limit=${CANTIDAD_ITEMS}`;
		setLoading(true);

		console.log(props.categoria.name);

		return Axios.get(url)
			.then(function (response) {
				setItems(response.data.results);

				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				setErrorBool(true);
			});
	};

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<div className="row mx-0 col-12 col-lg-10 mb-5 ">
			{loading && (
				<div className="col-10 my-5 ">
					<SkeletonTheme>
						<div className="w-100 mb-5 ">
							<Skeleton count={5} />
						</div>
					</SkeletonTheme>
				</div>
			)}
			<div className="col-12 row mx-0 ">
				<h2 className="col-12">
					<Link
						className="BreadcrumContainer-a"
						to={`/categoria/${props.categoria.name
							.toLowerCase()

							.replace(validarURL, "-")}/${props.categoria.id}`}
					>
						{props.categoria.name}
					</Link>
				</h2>
				{items.map((item) => {
					return <ItemBloque item={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};
export default CategoriaBaner;
