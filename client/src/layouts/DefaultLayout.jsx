/**
 * El formato más usado para mostrar las vistas que inlcuye nav y footer
 */
const defaultLayout = (props) => {
	return (
		<div>
			<p className="text-white p-5 text-center">Hola</p>
			{props.children}
		</div>
	);
};

export default defaultLayout;
