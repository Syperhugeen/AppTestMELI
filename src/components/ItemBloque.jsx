import { Link } from 'react-router-dom';

import '../assets/css/components/ItemBloque.scss';
import ImgFreeShipping from '../assets/Imagenes/Corporativas/ic_shipping.png';

const ItemBloque = (props) => {
	const item = props.item;

	const mondea = item.currency_id === 'USD' ? item.currency_id : '$';
	const isFreeShipping = item.shipping.free_shipping ? true : false;

	let getNameArreglado = (name) => {
		const lengthIdeal = 35;
		if (name.length > lengthIdeal) {
			return name.slice(0, lengthIdeal) + ' ...';
		} else {
			return name;
		}
	};

	return (
		<div
			className="p-2 col-4 col-lg-2
         d-flex flex-column  align-items-center item-bloque-contenedor "
		>
			<Link
				className="BreadcrumContainer-a"
				to={`/item/${item.title.toLowerCase().replace(/[^A-Z0-9]/gi, '-')}/${item.id}`}
			>
				<div className="w-100 bg-white rounded  d-flex flex-column  align-items-center">
					<div className="item-bloque-contenedor-img d-flex flex-row align-items-center justify-content-center  mb-2">
						<img src={item.thumbnail} alt={`Foto de ${item.title}`} className="item-bloque-img img-fluid" />
					</div>
					<div className="w-100 px-3 align-items-center">
						<div className="  ">
							<Link
								className="BreadcrumContainer-a"
								to={`/item/${item.title.toLowerCase().replace(/[^A-Z0-9]/gi, '-')}/${item.id}`}
							>
								<h2 className="item-bloque-title  ">{getNameArreglado(item.title)} </h2>
							</Link>

							<div className="d-flex -flex-row align-items-center item-bloque-precio-contenedor">
								<div className="item-bloque-precio  mb-0 mr-2">
									{mondea} {item.price}
								</div>
								{isFreeShipping && <img src={ImgFreeShipping} alt="Icono de free shipping" />}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ItemBloque;
