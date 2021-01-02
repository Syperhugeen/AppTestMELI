import "../../assets/css/layouts/components/Footer.scss";

const Footer = (props) => {
	return (
		<footer className="footer-contenedor d-flex flex-column align-items-center">
			<p className="text-center footer-parrafo">
				Test Práctico Frontend MELI Diciembre 2020{" "}
			</p>
			<p className="text-center footer-parrafo">
				Desarrollo por <b>Mauricio Costanzo</b>{" "}
			</p>
			<a
				href="https://github.com/Syperhugeen/AppTestMELI"
				className="btn btn-secondary  "
			>
				Click aquí 👉 para ir al repositorio y documentanción del proyecto
			</a>
		</footer>
	);
};

export default Footer;
