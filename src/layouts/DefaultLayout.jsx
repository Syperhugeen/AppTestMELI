import Header from "./components/Header";
import Footer from "./components/Footer";
/**
 * El formato más usado para mostrar las vistas que inlcuye nav y footer
 */
const defaultLayout = (props) => {
	return (
		<div>
			<Header />

			<div className="w-100 d-flex flex-column align-items-center">
				{props.children}
			</div>

			<Footer />
		</div>
	);
};

export default defaultLayout;
