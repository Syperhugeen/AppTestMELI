import React, { useState, useEffect } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

import "../assets/css/pages/Home.scss";

const Home = () => {
	useEffect(() => {
		document.title = `Mercado libre`;
	}, []);
	return <DefaultLayout></DefaultLayout>;
};

export default Home;
