# UADE-DyDWeb-BRodriguez

**Diseño y Desarrollo Web — 2026 1C**  
Alumna: Betsabé Ailen Rodríguez

Repositorio de entregas de la materia. Contiene tres proyectos web independientes, cada uno en su propia carpeta.

---

## Proyectos

### `TP1_Identikit_BRodriguez/`

Sitio web personal del **Trabajo Práctico 1 — Identikit**, titulado *El camino de regreso*. Es una página narrativa multipágina que presenta aspectos de la vida, la personalidad y los vínculos de la autora a través de un recorrido lineal por distintas secciones temáticas.

El sitio utiliza una estética de playa y arena, con menú de navegación vertical, música de fondo y recursos multimedia (imágenes y audios). Las secciones son:

| Sección | Archivo | Contenido |
|---|---|---|
| **Umbral** | `index.html` | Página de bienvenida e inicio del recorrido |
| **Huellas** | `huellas.html` | Fragmentos personales: intereses, gustos, forma de pensar y una tabla con pasiones cotidianas |
| **Vínculos** | `vinculos-entrada.html` → `vinculos.html` | Personas y mascotas importantes, con páginas individuales en `vinculos/` |
| **Fe y rito** | `fe-rito.html` | Reflexión sobre la fe y su evolución a lo largo de la vida |
| **Partitura** | `partitura.html` | Canciones significativas con reproductores de audio integrados |
| **Agradecimiento** | `agradecimiento.html` | Cierre del recorrido y sitios web que inspiraron el proyecto |

### `Linktree_BRodriguez/`

Página personal estilo *linktree* que funciona como punto de acceso central a los trabajos prácticos y al repositorio de GitHub. Muestra la foto de perfil, una breve presentación y enlaces a:

- **TP1 Identikit** — *El camino de regreso*, identikit personal narrativo
- **TP2 ONG** — sitio web de la organización *Cuadernos Llenos*
- **Repositorio GitHub** — este repositorio

La página incluye un video de fondo, tipografías de Google Fonts y un diseño responsive centrado en una tarjeta principal.

### `TP2_ONG_BRodriguez/`

Sitio web multipágina para la ONG ficticia **Cuadernos Llenos**, dedicada al apoyo escolar gratuito de niños y adolescentes en el Gran Buenos Aires. La organización ofrece espacios de estudio, acompañamiento pedagógico y programas para sostener la trayectoria educativa de chicos en contextos de vulnerabilidad.

El sitio incluye secciones de inicio con carrusel de imágenes, estadísticas, quiénes somos, qué hacemos, puntos de encuentro con mapa interactivo, contacto y una sección para voluntarios y donaciones. También cuenta con páginas detalladas de cada programa educativo.

---

## Estructura de archivos

```
UADE-DyDWeb-BRodriguez/
├── README.md
│
├── TP1_Identikit_BRodriguez/
│   ├── index.html              # Umbral — inicio del recorrido
│   ├── huellas.html            # Intereses y fragmentos personales
│   ├── vinculos-entrada.html   # Introducción a la sección Vínculos
│   ├── vinculos.html           # Mapa de vínculos (familia y mascotas)
│   ├── fe-rito.html            # Fe y ritual
│   ├── partitura.html          # Canciones con audio
│   ├── agradecimiento.html     # Cierre e inspiraciones
│   ├── css/
│   │   └── styles.css          # Estilos globales del identikit
│   ├── img/                    # Fondos, íconos y objetos en la arena
│   ├── audio/                  # Música de fondo y canciones de la partitura
│   └── vinculos/               # Páginas individuales de cada vínculo
│       ├── mama.html
│       ├── papa.html
│       ├── hermana.html
│       ├── esposo.html
│       ├── gatos.html
│       ├── perros1.html
│       └── perros2.html
│
├── Linktree_BRodriguez/
│   ├── index.html          # Página principal con enlaces
│   ├── style.css           # Estilos del linktree
│   └── img/                # Imágenes, íconos y video de fondo
│
└── TP2_ONG_BRodriguez/
    ├── index.html          # Página de inicio de la ONG
    ├── css/
    │   └── styles.css      # Hoja de estilos global del sitio
    ├── js/
    │   └── main.js         # Interactividad (menú, carrusel, mapa, modales)
    ├── pages/
    │   ├── quienes-somos.html
    │   ├── que-hacemos.html
    │   ├── mapa.html
    │   ├── contacto.html
    │   ├── quiero-ayudar.html
    │   └── programas/
    │       ├── aprendemos.html
    │       ├── empezar.html
    │       ├── futuros.html
    │       └── herramientas.html
    ├── Img/                # Logos, banners, fotos del equipo y programas
    └── docs/               # Documentación de la idea de la ONG (ver abajo)
```

### Cómo navegar el identikit (TP1)

- **`index.html`** es el punto de entrada; desde el botón *Comenzar* se avanza a `huellas.html`.
- El menú vertical del encabezado permite saltar entre las seis secciones en cualquier momento.
- La sección **Vínculos** tiene una página de entrada (`vinculos-entrada.html`), un mapa interactivo (`vinculos.html`) y subpáginas en **`vinculos/`** para cada persona o mascota.
- Los archivos de **`audio/`** incluyen la música de fondo (Wagner) y las canciones reproducibles en *Partitura*.

### Cómo navegar el sitio de la ONG (TP2)

- **`index.html`** es el punto de entrada; desde ahí se accede a todas las secciones internas.
- Las páginas secundarias están en **`pages/`** y referencian los recursos con rutas relativas (`../css/`, `../Img/`, etc.).
- Los programas educativos tienen su propia subcarpeta en **`pages/programas/`**.

---

## Documentación de la ONG (`TP2_ONG_BRodriguez/docs/`)

En la carpeta `docs/` se encuentra la **bitácora del proyecto** con el desarrollo de la idea de la ONG, basada en el documento enviado por el profesor:

| Archivo | Descripción |
|---|---|
| `Bitácora ONG - Cuadernos Llenos.pdf` | Versión en PDF de la bitácora |
| `Bitácora ONG - Cuadernos Llenos.docx` | Versión editable en Word |

Estos documentos detallan el concepto, la identidad y el planteo institucional de *Cuadernos Llenos* que dio origen al sitio web del TP2.

---

## Cómo visualizar los proyectos

Abrir el archivo `index.html` de cada carpeta directamente en el navegador:

- Identikit: `TP1_Identikit_BRodriguez/index.html`
- Linktree: `Linktree_BRodriguez/index.html`
- ONG: `TP2_ONG_BRodriguez/index.html`
