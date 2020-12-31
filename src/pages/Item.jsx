import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import useMetaTags from "react-metatags-hook";

import DefaultLayout from "../layouts/DefaultLayout";
import ItemLista from "../components/ItemLista";
import urlApiMeliPath from "../config/config";

import "../assets/css/layouts/components/Breadcrumb.scss";
import "../assets/css/pages/Item.scss";
import AppleIMG from "../assets/Imagenes/Corporativas/apple-72.png";
import LogoOg from "../assets/Imagenes/Corporativas/logoOG.jpg";

const Item = () => {
	// P A R A M S
	const itemId = useParams().item_id.replace(/-/g, " "); //SEO detalle

	// C A N T I D A D  D E   P R O D U C T O S   R E L A C I O N A D O S   A   P E D I R
	const CantidadAPedir = 10;

	// H E L P E R S
	const setParametroUrl = (parametro, valor) => {
		return `&${parametro}=${valor}`;
	};

	const validarPedirMas = (paging) => {
		if (items.length + CantidadAPedir < paging.primary_results) {
			if (items.length == 0) {
				setOffset(CantidadAPedir);
			} else {
				setOffset(CantidadAPedir + offset);
			}
		} else {
			setSePuedePedirResultados(false);
		}
	};

	const setUrlRequest = () => {
		const data = {
			item: `${urlApiMeliPath.pathItem}${itemId}`,
			itemDescripcion: `${urlApiMeliPath.pathCategoriaEspecifica}${itemId}`,
			categoria: `${urlApiMeliPath.pathCategoriaEspecifica}${item.category_id}`,
		};

		return data;
	};

	// H O O K S
	const [itemIdAnterior, setItemIdAnterior] = useState(itemId);
	const [sePuedePedirResultados, setSePuedePedirResultados] = useState(true);
	const [offset, setOffset] = useState(0); // Posición de la paginación de los resultados

	const [loading, setLoading] = useState(true);

	const [loadingCategoria, setLoadingCategoria] = useState(false);
	const [loadingDescripcion, setLoadingDescripcion] = useState(false);

	const [error, setError] = useState(null);
	const [errorBool, setErrorBool] = useState(false);

	const [items, setItems] = useState([]);
	const [item, setItem] = useState(false);
	const [categoria, setCategoria] = useState(false);

	// R E Q U E S T

	const cargarMasItems = () => {
		fetchItems();
	};

	const fetchItems = () => {
		const url = setUrlRequest();
		setLoading(true);

		return Axios.get(url.items)
			.then(function (response) {
				let data = response.data;

				if (itemId == itemIdAnterior) {
					setItems(items.concat(data.results));
				} else {
					setItems(data.results);
				}

				validarPedirMas(data.paging);

				setItemIdAnterior(itemId); // -> Mejorar

				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				setErrorBool(true);
				setError(error);
			});
	};

	const fetchItem = () => {
		const url = setUrlRequest();
		setLoading(true);

		return Axios.get(url.item)
			.then(function (response) {
				let data = response.data;
				setItem(data);
				setItemIdAnterior(itemId); // -> Mejorar
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				setErrorBool(true);
				setError(error);
			});
	};

	const fetchCategoriaPrincipal = () => {
		const url = `${setUrlRequest().categoria}`;

		setLoadingCategoria(true);

		return Axios.get(url)
			.then(function (response) {
				let data = response.data;
				setCategoria(data);
				setLoadingCategoria(false);
			})
			.catch(function (error) {
				setLoadingCategoria(false);
				setErrorBool(true);
				setError(error.error);
			});
	};

	useEffect(() => {
		fetchItem();
	}, [itemId]);

	useEffect(() => {
		if (item) {
			fetchCategoriaPrincipal();
		}
	}, [item]);

	useMetaTags(
		{
			title: `${item.title}  Mercado libre`,
			description: `Lo mejor de ${item.title} está en Mercado Libre. Entrá y conocé nuestras increíbles ofertas y promociones. Descubrí la mejor forma de comprar online. `,

			metas: [
				{ name: "keywords", content: `${item.title}` },
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
				title: `${item.title}  Mercado libre`,
				image: LogoOg,
				site_name: "Mercado libre",
			},
		},
		[item]
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
														.replace(/,/g, "")
														.replace(/ /g, "-")}/${categoria.id}`}
												>
													{categoria.name}
												</Link>
											</span>
											<span className="mr-2"> > </span>
										</span>
									);
								})}
							</div>
						</div>
					)}
				</div>

				{errorBool && (
					<p className="text-center text-danger my-2 ">
						Upsssssss!! Tuvimos un error de conexión.
						<Link className="ml-2 text-danger" to="/">
							Click aquí para solucionar
						</Link>
						.
					</p>
				)}

				{loading && (
					<div className="col-10 my-5 ">
						<SkeletonTheme>
							<div className="w-100 row align-items-center justify-content-center py-2 mb-5">
								<div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center">
									<Skeleton circle={true} height={200} width={200} />
								</div>
								<p className="col-12 col-lg-6">
									<Skeleton count={9} />
								</p>
							</div>
							<div className="w-100 ">
								<Skeleton count={15} />
							</div>
						</SkeletonTheme>
					</div>
				)}

				{!loading && item !== false && (
					<div className="col col-lg-10  ">
						<div className="w-100 row mx-0">
							<div className="col-12 col-lg-8 d-flex flex-column align-items-center justify-content-center ">
								<div className="item-contenedor-img d-flex flex-column align-items-center justify-content-center bg-white rounded">
									<img
										src={item.pictures[0].url}
										alt={`Foto principal del artículo ${item.title}`}
										className="item-img"
									/>
								</div>
							</div>
							<div className="col-12 col-lg-4">
								<div className="item-condition-and-sold">
									{`${item.condition === "new" ? "Nuevo" : ""} ${
										item.sold_quantity > 0 ? item.sold_quantity : ""
									}  ${item.sold_quantity == 1 ? "Vendida" : ""}
								${item.sold_quantity > 1 ? "Vendidas" : ""}`}
								</div>
								<h1 className="item-title">{item.title}</h1>
								<div className="item-price">
									{`${item.currency_id === "USD" ? item.currency_id : "$"} ${
										item.price
									}`}
								</div>
								<div className="item-contenedor-boton">
									<button className="item-boton">Comprar</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* {!loading && items.length > 0 && sePuedePedirResultados && (
					<button
						onClick={cargarMasItems}
						className="btn btn-secondary btn-lg my-5"
					>
						Cargar {CantidadAPedir} resultados más
					</button>
				)} */}
			</div>
		</DefaultLayout>
	);
};

export default Item;
