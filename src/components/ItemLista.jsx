import { Link } from 'react-router-dom';

import '../assets/css/components/ItemLista.scss';
import ImgFreeShipping from '../assets/Imagenes/Corporativas/ic_shipping.png';

const ItemLista = (props) => {
	const item = props.item;

	const mondea = item.currency_id === 'USD' ? item.currency_id : '$';
	const isFreeShipping = item.shipping.free_shipping ? true : false;

	let getNameArreglado = (name) => {
		const lengthIdeal = 45;
		if (name.length > lengthIdeal) {
			return name.slice(0, lengthIdeal) + ' ...';
		} else {
			return name;
		}
	};

	return (
		<div className="p-0 col-12 d-flex flex-row align-items-center  item-lista-contenedor">
			<Link
				className="BreadcrumContainer-a"
				to={`/item/${item.title.toLowerCase().replace(/[^A-Z0-9]/gi, '-')}/${item.id}`}
			>
				<div className="item-lista-contenedor-img d-flex flex-row align-items-center justify-content-center">
					<img src={item.thumbnail} alt={`Foto de ${item.title}`} className="item-lista-img img-fluid" />
				</div>
			</Link>
			<div className="w-100 row mx-0 align-items-center">
				<div className="col-12 col-lg-8 align-self-start ">
					<div className="d-flex -flex-row align-items-center item-lista-precio-contenedor">
						<div className="item-lista-precio  mb-0 mr-2">
							{mondea} {item.price}
						</div>
						{isFreeShipping && <img src={ImgFreeShipping} alt="Icono de free shipping" />}
					</div>
					<Link
						className="BreadcrumContainer-a"
						to={`/item/${item.title.toLowerCase().replace(/[^A-Z0-9]/gi, '-')}/${item.id}`}
					>
						<h2 className="item-lista-title  ">{getNameArreglado(item.title)} </h2>
					</Link>
				</div>
				<div className="col-12 col-lg-4">
					<div className="item-lista-ciudad">{item.seller_address.state.name}</div>
				</div>
			</div>
		</div>
	);
};

export default ItemLista;
