import Header from "./components/Header";
import Footer from "./components/Footer";
import "../assets/css/layouts/layout.scss";
/**
 * El formato más usado para mostrar las vistas que inlcuye nav y footer
 */
const defaultLayout = (props) => {
	return (
		<div>
			<Header />

			<div className="w-100 d-flex flex-column align-items-center layout-contenedor-content ">
				{props.children}
			</div>

			<Footer />
		</div>
	);
};

export default defaultLayout;
