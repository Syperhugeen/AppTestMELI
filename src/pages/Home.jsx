import React, { useState, useEffect } from "react";
import useMetaTags from "react-metatags-hook";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Axios from "axios";

import urlApiMeliPath from "../config/config";

import DefaultLayout from "../layouts/DefaultLayout";
import CategoriaBaner from "../components/CategoriaBaner";
import BanerHome from "../components/BanerHome";
import { shuffleArrayAndReduce } from "../helpers/functions";

import "../assets/css/pages/Home.scss";
import AppleIMG from "../assets/Imagenes/Corporativas/apple-72.png";
import LogoOg from "../assets/Imagenes/Corporativas/logoOG.jpg";

const Home = () => {
	const [loadingCategorias, setLoadingCategorias] = useState(false);
	const [categorias, setCategorias] = useState([]);
	const [errorBool, setErrorBool] = useState(false);

	const fetchCategorias = () => {
		setLoadingCategorias(true);

		return Axios(urlApiMeliPath.pathCategoriasDelSitio)
			.then(function (response) {
				let data = response.data;

				setCategorias(shuffleArrayAndReduce(data.categories, 6));

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

	useMetaTags(
		{
			title: ` Mercado Libre`,
			description: `La comunidad de compra y venta online más grande de América Latina. `,

			metas: [
				{ name: "keywords", content: `Mercado Libre` },
				{ name: "robots", content: "index, follow" },

				{ name: "url", content: window.location.href },

				{ "http-equiv": "Cache-Control", content: "no-cache" },
			],
			links: [
				{ rel: "canonical", href: window.location.href },
				{
					rel: "icon",
					type: "image/ico",
					href:
						"https://mlstaticquic-a.akamaihd.net/frontend-assets/ui-navigation/5.12.0/mercadolibre/favicon.svg",
				},

				{
					rel: "apple-touch-icon",
					sizes: "72x72",
					type: "image/png",
					href: AppleIMG,
				},
			],
			openGraph: {
				title: ` Mercado libre`,
				image: LogoOg,
				site_name: "Mercado libre",
			},
		},
		[]
	);
	return (
		<DefaultLayout>
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
			<div className="w-100 d-flex align-items-center flex-column">
				<LazyLoadImage
					src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-especial-reyes/6ffc6db0-4944-11eb-8722-9d30f54fe8e5-home-slider_desktop.jpg"
					alt="Baner de reyes Mercado libre"
					className="img-fluid "
					effect="blur"
				/>
			</div>
			<BanerHome />
			{categorias.length > 0 && !loadingCategorias && (
				<div className="container mx-0 d-flex flex-column align-items-center py-4">
					{categorias.map((cateogira) => {
						return <CategoriaBaner categoria={cateogira} key={cateogira.id} />;
					})}
				</div>
			)}
		</DefaultLayout>
	);
};

export default Home;
