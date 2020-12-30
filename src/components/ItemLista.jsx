import "../assets/css/components/ItemLista.scss";
import ImgFreeShipping from "../assets/Imagenes/Corporativas/ic_shipping.png";

const ItemLista = (props) => {
	const item = props.item;

	const mondea = item.currency_id === "USD" ? item.currency_id : "$";
	const isFreeShipping = item.shipping.free_shipping ? true : false;

	return (
		<div className="p-0 col-12 d-flex flex-row align-items-center  item-lista-contenedor">
			<div className="d-flex flex-row align-items-center justify-content-center">
				<img
					src={item.thumbnail}
					alt={`Foto de ${item.title}`}
					className="item-lista-img"
				/>
			</div>
			<div className="w-100 d-flex felx-row align-items-start">
				<div className="w-75 align-self-start ">
					<div className="d-flex -flex-row align-items-center item-lista-precio-contenedor">
						<div className="item-lista-precio  mb-0 mr-2">
							{mondea} {item.price}
						</div>
						{isFreeShipping && (
							<img src={ImgFreeShipping} alt="Icono de free shipping" />
						)}
					</div>
					<h2 className="item-lista-title  "> {item.title} </h2>
				</div>
				<div className="w-25">
					<div>{item.seller_address.state.name}</div>
				</div>
			</div>
		</div>
	);
};

export default ItemLista;
