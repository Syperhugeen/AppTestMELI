import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import useMetaTags from "react-metatags-hook";
import DefaultLayout from "../layouts/DefaultLayout";
import ItemLista from "../components/ItemLista";
import urlApiMeliPath from "../config/config";
import validarURL from "../config/validarURL";
import { setParametroUrl } from "../helpers/functions";

import "../assets/css/layouts/components/Breadcrumb.scss";
import AppleIMG from "../assets/Imagenes/Corporativas/apple-72.png";
import LogoOg from "../assets/Imagenes/Corporativas/logoOG.jpg";

const Categoria = () => {
	// Q U E R Y
	const categoriaId = useParams().categoria_id.replace(/-/g, " "); //SEO detalle

	const CantidadAPedir = 10;

	const validarPedirMas = (paging) => {
		if (items.length + CantidadAPedir < paging.primary_results) {
			if (items.length === 0) {
				setOffset(CantidadAPedir);
			} else {
				setOffset(CantidadAPedir + offset);
			}
		} else {
			setSePuedePedirResultados(false);
		}
	};

	const setUrlRequest = () => {
		let posicionOffser = 0;
		if (categoriaId === categoriaIdAnterior) {
			posicionOffser = items.length;
		} else {
			posicionOffser = 0;
		}
		const data = {
			items: `${
				urlApiMeliPath.pathItemsDeCategoria
			}${categoriaId}${setParametroUrl(
				"limit",
				CantidadAPedir
			)}${setParametroUrl("offset", posicionOffser)}`,
			categoria: `${urlApiMeliPath.pathCategoriaEspecifica}${categoriaId}`,
		};

		return data;
	};

	// H O O K S
	const [categoriaIdAnterior, setCategoriaIdAnterior] = useState(categoriaId);
	const [sePuedePedirResultados, setSePuedePedirResultados] = useState(true);
	const [offset, setOffset] = useState(0); // Posición de la paginación de los resultados
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);
	const [items, setItems] = useState([]);
	const [categoria, setCategoria] = useState(false);

	const [loadingCategoria, setLoadingCategoria] = useState(false);

	// R E Q U E S T

	const cargarMasItems = () => {
		fetchItems();
	};

	const fetchCategoriaPrincipal = () => {
		const url = `${setUrlRequest().categoria}`;

		setLoadingCategoria(true);

		return Axios.get(url)
			.then(function (response) {
				let data = response.data;
				setCategoria(data);
				fetchItems().then(function () {});
				setLoadingCategoria(false);
			})
			.catch(function (error) {
				setLoadingCategoria(false);
				setErrorBool(true);
				setError(error.error);
			});
	};

	const fetchItems = () => {
		const url = setUrlRequest();
		setLoading(true);

		return Axios.get(url.items)
			.then(function (response) {
				let data = response.data;

				if (categoriaId === categoriaIdAnterior) {
					setItems(items.concat(data.results));
				} else {
					setItems(data.results);
				}

				validarPedirMas(data.paging);

				setCategoriaIdAnterior(categoriaId); // -> Mejorar

				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				setErrorBool(true);
				setError(error);
			});
	};

	useEffect(() => {
		fetchCategoriaPrincipal().then(function () {});
	}, [categoriaId]);

	useMetaTags(
		{
			title: `${categoria.name}  Mercado libre`,
			description: `Lo mejor de ${categoria.name} está en Mercado Libre. Entrá y conocé nuestras increíbles ofertas y promociones. Descubrí la mejor forma de comprar online. `,

			metas: [
				{ name: "keywords", content: `${categoria.name}` },
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
				title: `${categoria.name}  Mercado libre`,
				image: LogoOg,
				site_name: "Mercado libre",
			},
		},
		[categoria]
	);

	return (
		<DefaultLayout>
			<div className="container d-flex flex-column align-items-center">
				<div className="col col-lg-10">
					{loadingCategoria && <Skeleton count={1} />}
					{categoria !== false && !loadingCategoria && (
						<div>
							<div className="BreadcrumContainer">
								{categoria.path_from_root.map((categoria) => {
									return (
										<span>
											<span key={categoria.id} className="mr-2">
												<Link
													className="BreadcrumContainer-a"
													to={`/categoria/${categoria.name
														.toLowerCase()
														.replace(validarURL, "-")}/${categoria.id}`}
												>
													{categoria.name}
												</Link>
											</span>
											<span className="mr-2"> > </span>
										</span>
									);
								})}
							</div>
							<h1 className="h3 BreadcrumContainer-titulo">{categoria.name}</h1>
						</div>
					)}
				</div>
				<div className="col col-lg-10  bg-white rounded">
					{errorBool && (
						<p className="text-center text-danger my-2 ">
							Upsssssss!! Tuvimos un error de conexión.
							<Link className="text-danger" to="/">
								Click aquí para solucionar
							</Link>
							.
						</p>
					)}
					{items.length > 0 && (
						<div className="">
							{items.map((item) => {
								return <ItemLista item={item} key={item.id} />;
							})}
						</div>
					)}

					<div id="cargarOnScroll"></div>
				</div>
				{loading && (
					<div className="col-10">
						<SkeletonTheme count={2}>
							<div className="w-100 row alig-items-center py-2">
								<div className="col-2 d-flex flex-column align-items-center justify-content-center">
									<Skeleton circle={true} height={70} width={70} />
								</div>
								<p className="col-10">
									<Skeleton count={5} />
								</p>
							</div>
						</SkeletonTheme>
					</div>
				)}

				{!loading && items.length > 0 && sePuedePedirResultados && (
					<button
						onClick={cargarMasItems}
						className="btn btn-secondary btn-lg my-5"
					>
						Cargar {CantidadAPedir} resultados más
					</button>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Categoria;
