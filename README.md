# Test Práctico - Frontend MELI 2020

## [Link en producción](https://appmeli.worldmaster.com.uy/)

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

![](MELI%20TEST%202020.001.png)

![](MELI%20TEST%202020.002.png)

**Escalabilidad**

- Reusabilidad de diversos componentes (_src/components/_): en diversas páginas. Cada uno con su lógica encapsulada y archivo de estilo específico.
- Fácil incorporación de nuevos componentes.
- Cambios de estilo de forma fácil a través de archivos de estilo.

Aspectos mejorables

Debido a que es la primera vez que utilizo React, el aprendizaje de la nueva tecnología y el desarrollo se realizó de forma paralela, por lo que el desarrollo de los primeros componentes y la estructuración del código dista de lo óptimo.

Se detallan a continuación algunos aspectos de los cuales soy consciente que se pueden mejorar, pero quizá haya otros tantos que por la falta de experiencia no sea capaz de detectarlos.

**Estructura del código**

- En algunos casos se debe dividir en varios componentes. Mejorar código adoptando mejores prácticas a la hora de trabajar con hooks.
- Componentes que seguro hay que refactorizar son los que están en la carpeta pages.

**Decisiones técnicas**

- Actualmente usé Axios para las peticiones http asíncronas, pero es innecesario, ya que Fetch tiene un amplio soporte en navegadores).

**Reusabilidad**

- Como el código de las peticiones es similar siempre habría que hacer alguna función que se pueda reutilizar en todos los componentes. Esa función se pondría en helpers o crearíamos Un nuevo tipo de “Clase” llamado repositorios.

Robustez

- Mejorar el manejo de errores de las peticiones.

Experiencia de usuario mobile

- En móviles mejorar la carga de imágenes.

SEO

- Crear condiciones para indexar o no algunas páginas acordes a los resultados de búsqueda. Ejemplo: una página de producto de un vendedor con mala reputación no se debería indexar. Así como páginas con pocos resultados de búsquedas o con resultados de mala calidad (en cuanto al vendedor o a la calidad de la publicación).

Documentación y pruebas automatizadas

- Documentar el código y mejorar la estructura de carpetas.
- Pruebas unitarias de cada componente.
