import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import DefaultLayout from '../layouts/DefaultLayout';
import ItemLista from '../components/ItemLista';
import urlApiMeliPath from '../config/config';
import { useParams } from 'react-router-dom';

import '../assets/css/pages/resultadoDeBusqeda.scss';

class ResultadoDeBusqueda extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.setParametroUrl = this.setParametroUrl.bind(this);
		this.validarPedirMas = this.validarPedirMas.bind(this);
		this.fetchItems = this.fetchItems.bind(this);
		this.state = {
			queryAnterior: '',
			query: props.match.params.query.replace(/-/g, ' '),
			cantidadAPedir: 20,
			goingDown: false,
			prevScrollY: 0,
			setOffset: 0,
			items: [],
			sePuedePedirResultados: true,
			loading: false,
			cantidadDePeticiones: 0,
			error: null,
			errorBool: false,
			categorias: []
		};
	}

	// H E L P E R S
	setParametroUrl = (parametro, valor) => {
		return `&${parametro}=${valor}`;
	};

	validarPedirMas = (paging) => {
		if (this.state.items.length + this.state.cantidadAPedir < paging.primary_results) {
			if (this.state.items.length == 0) {
				this.setState((state, props) => ({
					offset: state.cantidadAPedir
				}));
			} else {
				this.setState((state, props) => ({
					offset: state.offset + state.cantidadAPedir
				}));
			}
		} else {
			this.setState((state, props) => ({
				sePuedePedirResultados: false
			}));
		}
	};

	clearAlCambiarLaQuery = () => {};

	setUrlRequest = () => {
		let posicionOffser = 0;
		if (this.state.query == this.state.queryAnterior) {
			posicionOffser = this.state.items.length;
		} else {
			posicionOffser = 0;
		}
		return `${urlApiMeliPath.pathBusqueda}${this.state.query}${this.setParametroUrl(
			'limit',
			this.state.cantidadAPedir
		)}${this.setParametroUrl('offset', posicionOffser)}`;
	};

	handerScroll = () => {
		console.log('scroll');
	};

	// R E Q U E S T

	cargarMasItems = () => {
		this.fetchItems();
	};

	fetchCategorias = () => {
		alert(`et ${this.state.offset}`);
	};

	fetchItems = async () => {
		var url = this.setUrlRequest();

		try {
			this.setState((state, props) => ({
				loadin: true
			}));

			const response = await fetch(url);
			const data = await response.json();

			if (this.state.query == this.state.queryAnterior) {
				this.setState((state, props) => ({
					items: state.items.concat(data.results)
				}));
			} else {
				this.setState((state, props) => ({
					items: data.results
				}));
			}

			this.validarPedirMas(data.paging);

			this.setState((state, props) => ({
				queryAnterior: state.query
			}));

			this.setState((state, props) => ({
				loadin: false
			}));
		} catch (error) {}
	};

	componentDidMount() {
		document.title = `${this.state.query}  Mercado libre`;

		alert(`${this.state.query}  Mercado libre`);

		this.fetchItems();
	}

	render() {
		return (
			<DefaultLayout>
				<div className="container d-flex flex-column align-items-center">
					<div>Cargas más offset {this.state.offset}</div>
					<div className="col col-lg-10  bg-white">
						{this.state.errorBool && <p>`Error: ${this.state.error}`</p>}
						{this.state.items.length > 0 && (
							<div className="mb-4">
								{this.state.items.map((item) => {
									return <ItemLista item={item} key={item.id} />;
								})}
							</div>
						)}

						{this.state.items.length <= 0 && this.state.cantidadDePeticiones == 1 && (
							<div className="h3 py-5 text-center">
								Para encontrar algún producto mejorá la búsqueda acortando la frase 😉
							</div>
						)}

						{!this.state.loading && (
							<div onClick={this.cargarMasItems} className="btn">
								Cargas más offset {this.state.offset}
							</div>
						)}

						<div id="cargarOnScroll"></div>

						{this.state.loading && (
							<SkeletonTheme>
								<div className="w-100 row alig-items-center py-2">
									<div className="col-2 d-flex flex-column align-items-center justify-content-center">
										<Skeleton circle={true} height={70} width={70} />
									</div>
									<p className="col-10">
										<Skeleton count={3} />
									</p>
								</div>
							</SkeletonTheme>
						)}
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

export default ResultadoDeBusqueda;
