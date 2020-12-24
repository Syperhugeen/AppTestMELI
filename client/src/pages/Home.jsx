import DefaultLayout from "../layouts/DefaultLayout";

import "../assets/css/pages/Home.scss";

const home = () => {
	return (
		<DefaultLayout>
			<div className="home-contenedor">
				<header className="App-header">
					<p className="p-2 text-primary my-5">
						Editarss <span className="text-white">src/App.js </span> and save to
						reload.
					</p>
					<span>learn asdasd</span>
				</header>
			</div>
		</DefaultLayout>
	);
};

export default home;
