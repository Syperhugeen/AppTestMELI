# Test Práctico - Frontend MELI 2020

## [Link en producción](https://appmeli.worldmaster.com.uy/)

## Descripción y estructura del documento

En este documento se detalla el trabajo realizado relacionado al challenge técnico para el desarrollo web. En la sección de Alcance se describe el desarrollo realizado de acuerdo a lo solicitado y las tecnologías utilizadas. En la sección de Estructura de directorios se detalla la estructura y contenido de las carpetas del proyecto. En la sección de Deploy se detallan los pasos para desplegar la aplicación en ambientes de desarrollo y producción. En la sección Consideraciones relacionadas a aspectos de calidad se detallan las decisiones de diseño relacionadas a los aspectos de calidad que se solicitó tener en cuenta para el desarrollo. Por último, en la sección Aspectos mejorables se detallan algunos aspectos a mejorar relacionados a la mantenibilidad, robustez y documentación (entre otros) del código

generado.

## Alcance

De lo solicitado en el documento “Front-End Test Práctico.pdf” detallo a continuación lo desarrollado tanto del lado del cliente como del servidor.

### Cliente

#### Vistas

Se desarrollaron todas las vistas solicitadas: **(1) Caja de búsqueda**, **(2) Resultado de búsqueda** y **(3) Detalle del producto**. Además de estas vistas, se desarrollaron 2 vistas extra: **(4) Home**, que contiene la caja de búsqueda y un conjunto de categorías de productos por las cuales se puede navegar, y **(5) Vista de categoría**, que realiza una búsqueda aplicando el filtro de la categoría seleccionada.

#### Endpoints

A continuación se detallan los endpoints para cada vista. En particular, no hay un endpoint para la caja de búsqueda, el equivalente sería el Home en la aplicación desarrollada. La caja de búsqueda en sí, se encuentra integrada en todas las vistas.

1. **Resultado de búsqueda: [**https://appmeli.worldmaster.com.uy/items/search/celulares](https://appmeli.worldmaster.com.uy/items/search/celulares)**
2. **Detalle del producto: [**https://appmeli.worldmaster.com.uy/item/lg-k50-32-gb-aurora-black-3-gb-ram/MLA898423182](https://appmeli.worldmaster.com.uy/item/lg-k50-32-gb-aurora-black-3-gb-ram/MLA898423182)**
3. **Home:** [\*\*https://appmeli.worldmaster.com.uy/](https://appmeli.worldmaster.com.uy/)\*\*
4. **Vista de categoría: [**https://appmeli.worldmaster.com.uy/categoria/celulares-y-tel%C3%A9fonos/MLA105](https://appmeli.worldmaster.com.uy/categoria/celulares-y-tel%C3%A9fonos/MLA1051)**

### Servidor

No fue necesario implementar lógica del lado del servidor ya que la aplicación es del tipo _single-page application,_ lo cual permite contar con un sistema de enrutamiento (endpoints) sin necesidad de consultar a un servidor. Esto brinda una experiencia de usuario más fluida (la página no se recarga por completo).

Se instaló y configuró la librería Express con el fin de ejecutar el script _server.js,_ ubicado en la raíz del proyecto en caso de que se desee realizar un deploy en algún servidor con NODE.

Para poder enviar un link con el proyecto en producción, el mismo quedó deployado y en funcionamiento en un servidor apache, accesible a través de la siguiente ruta: <https://appmeli.worldmaster.com.uy/>. Usé apache porque era lo que tenía disponible.

## Tecnologías utilizadas

- HTML
- React, específicamente el paquete Creat-react-app.
- El preprocesador de CSS es SASS.
- react-router-dom para manejar las rutas.

Por más información de librerías utilizadas consultar el archivo package.json.

## Estructura de directorios

La carpeta que contiene todo el código fuente de la aplicación es **_src/_** y se estructura de la siguiente forma:

- **_src/assets/_**: contiene css e imágenes.
- En _css/boostrap/_ está la librería de SASS de boostrap. Se inyectaron algunos archivos para editar los colores y breakpoints. Se customizó el archivo *css/boostrap/scss/boostrap.scs*s para quitar lo que no se usa de la librería.
- Las carpetas _css/components/_, _css/pages/_, y _css/layouts/_ contienen los estilos de los componentes que están en las carpetas _src/components_, _src/pages_, y _src/layouts_.
- **_src/layouts/_**: contiene los componentes del tipo layout. El único componente que tiene actualmente es DefaultLayout.jsx (plantilla que contiene el HEADER y FOOTER), que se reutiliza en todas las páginas.
- **src/pages/**: contiene los componentes de la vista de cada página, los cuales usan el componente DefaultLayout.jsx.
- src/components/: contiene componentes pequeños que se utilizan en las páginas (por ejemplo: ItemBloque.jsx).
- **src/config/**: contiene configuraciones varias (por ejemplo las rutas a la API de MELI)
- **_src/helpers/_**: contiene algunas funciones que se utilizan en varios componentes. Por ejemplo: functions.js la cual exporta varias funciones que se utilizan para reducir arrays entre otras cosas.
- Archivos bajo src/
- _App.js_: contiene las rutas de la aplicación.
- _App.test.js_: contiene los test para las pruebas unitarias (no están implementados)

## Deploy

Dependiendo del ambiente en el cual se vaya a deployar la aplicación, seguir los pasos detallados a continuación.

### Ambiente de desarrollo

Pasos a seguir:

1. Clonar repositorio
1. Ejecutar el comando **npm install** dentro de la carpeta del repositorio
1. Crear servidor de desarrollo con **npm start**

### Ambiente de producción

Pasos a seguir

1. Cambiar en _/package.json_ el atributo “homepage” al dominio o ruta donde se desea que corra la aplicación.
1. Ejecutar el comando **npm run build**
1. Hacer push al repositorio remoto para enviar el nuevo build el cual se compila dentro de la carpeta _/build_ y luego hacer un **git pull** desde el server.
1. Si se usa un servidor de producción con Node, ejecutar el comando **git pull** en ese entorno. Y actualizar el archivo .gitignore para que no trakee _/build_.
1. En el caso de un servidor con NODE ejecutar el comando **node server.js** el cual creará un servidor con EXPRESS el cual ya está configurado.

## Consideraciones relacionadas a aspectos de calidad

**Usabilidad**

- Diseño responsive: se adapta a diferentes tamaños de pantalla y dispositivos.
- Navegación intuitiva:
  - Se buscó mejorar a través del desarrollo del home y las vistas por categorías.
  - Se puede navegar a través del bread-crumb.
  - Se muestran ítems relacionados en la visualización de un ítem particular.
- Diseño minimalista: títulos cortos, pocos artículos por categoría.
- Estética de la página: utilización de _loaders_ (sensación de carga de contenido) para mejorar la experiencia de usuario.
- Se cambió el límite de peticiones de 4 a 10 para darle más contenido al listado.
- Se agregó un botón de “Cargar más” al final del listado para seguir cargando ítems relacionados (en vez de la clásica paginación).

**SEO**

- Contenido de etiquetas html personalizado para cada página.
- URL’s amigables (ej:/item/pintura-latex-interior-exterior-mate-20-lts-sherwin-williams/MLA784885224)

**Performance**

- Carga de imágenes _lazy_ para acelerar el tiempo de carga del contenido de la página.
- Ahorro de consulta al servidor por ser _single-page application_.
- Buen rendimiento de acuerdo a [PageSpeed ](https://developers.google.com/speed)de Google (mejorable)

![](<Test%20Práctico%20-%20Frontend%20MELI%202020%20(1).001.png>)

![](<Test%20Práctico%20-%20Frontend%20MELI%202020%20(1).002.png>)

**Escalabilidad**

- Reusabilidad de diversos componentes (_src/components/_): en diversas páginas. Cada uno con su lógica encapsulada y archivo de estilo específico.
- Fácil incorporación de nuevos componentes.
- Cambios de estilo de forma fácil a través de archivos de estilo.

## Aspectos mejorables

Debido a que es la primera vez que utilizo React, el aprendizaje de la nueva tecnología y el desarrollo se realizó de forma paralela, por lo que el desarrollo de los primeros componentes y la estructuración del código dista de lo óptimo.

Se detallan a continuación algunos aspectos de los cuales soy consciente que se pueden mejorar, pero quizá haya otros tantos que por la falta de experiencia no sea capaz de detectarlos (como por ejemplo, adoptar mejores prácticas a la hora de trabajar con hooks).

**Estructura del código**

- Mayor componentización (por ejemplo: categorías y resultados de búsqueda)

**Decisiones técnicas**

- Actualmente usé Axios para las peticiones http asíncronas, pero es innecesario, ya que Fetch tiene un amplio soporte en navegadores).

**Reusabilidad**

- Como el código de las peticiones es similar, sería deseable implementar una función genérica de petición que pueda ser reutilizada en todos los componentes. Esa función se organizaría bajo helpers.

**Robustez**

- Mejorar el manejo de errores de las peticiones, por ejemplo los errores relacionados a estados de código http (400, 500, 404, 403, etc.)

**Experiencia de usuario mobile**

- Mejorar la carga de imágenes seleccionando aquellas con tamaño adecuado para dispositivos mobile.

**SEO**

- Crear condiciones para indexar o no algunas páginas de acuerdo a los resultados de búsqueda. Ejemplos:
- Una página de producto de un vendedor con mala reputación no se debería indexar.
- Páginas con pocos resultados de búsquedas o con resultados de mala calidad (en cuanto al vendedor o a la calidad de la publicación).

**Documentación y pruebas automatizadas**

- Documentar el código y mejorar la estructura de carpetas.
- Implementación de pruebas unitarias de cada componente.
