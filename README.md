# UADE-DyDWeb-BRodriguez

**Diseño y Desarrollo Web — 2026 1C**  
Alumna: Betsabé Ailen Rodríguez

Repositorio de entregas de la materia. Contiene dos proyectos web independientes, cada uno en su propia carpeta.

---

## Proyectos

### `Linktree_BRodriguez/`

Página personal estilo *linktree* que funciona como punto de acceso central a los trabajos prácticos y al repositorio de GitHub. Muestra la foto de perfil, una breve presentación y enlaces a:

- **TP1 Identikit** — página de presentación personal
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

### Cómo navegar el sitio de la ONG

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
