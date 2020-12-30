import React, { useState, useEffect } from 'react';
import useMetaTags from 'react-metatags-hook';
import DefaultLayout from '../layouts/DefaultLayout';

import '../assets/css/pages/Home.scss';
import AppleIMG from '../assets/Imagenes/Corporativas/apple-72.png';
import LogoOg from '../assets/Imagenes/Corporativas/logoOG.jpg';

const Home = () => {
	useMetaTags(
		{
			title: ` Mercado Libre`,
			description: `La comunidad de compra y venta online más grande de América Latina. `,

			metas: [
				{ name: 'keywords', content: `Mercado Libre` },
				{ name: 'robots', content: 'index, follow' },

				{ name: 'url', content: window.location.href },

				{ 'http-equiv': 'Cache-Control', content: 'no-cache' }
			],
			links: [
				{ rel: 'canonical', href: window.location.href },
				{
					rel: 'icon',
					type: 'image/ico',
					href:
						'https://mlstaticquic-a.akamaihd.net/frontend-assets/ui-navigation/5.12.0/mercadolibre/favicon.svg'
				},

				{ rel: 'apple-touch-icon', sizes: '72x72', type: 'image/png', href: AppleIMG }
			],
			openGraph: {
				title: ` Mercado libre`,
				image: LogoOg,
				site_name: 'Mercado libre'
			}
		},
		[]
	);
	return <DefaultLayout></DefaultLayout>;
};

export default Home;
