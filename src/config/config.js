const PAIS_CODE = 'MLA';

const urlApiMeliPath = {
	pathBusqueda: `https://api.mercadolibre.com/sites/${PAIS_CODE}/search?q=`,
	pathCategoriasAlBusqueda: `https://api.mercadolibre.com/sites/${PAIS_CODE}/domain_discovery/search?q=`,
	pathItem: `https://api.mercadolibre.com/items/`,
	pathCategoriaEspecifica: `https://api.mercadolibre.com/categories/`,
	pathItemsDeCategoria: `https://api.mercadolibre.com/sites/${PAIS_CODE}/search?category=`,
	pathCategoriasDelSitio: `https://api.mercadolibre.com/sites/${PAIS_CODE}`
};

export default urlApiMeliPath;
