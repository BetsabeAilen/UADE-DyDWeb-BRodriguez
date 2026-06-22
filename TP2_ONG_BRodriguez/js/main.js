/* ===== EVENTOS DE UI (delegación) ===== */
document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.menu-toggle');
    if (toggle) {
        const menu = document.querySelector('.menu');
        if (menu) {
            const abierto = menu.classList.toggle('flexNav');
            toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        }
        return;
    }

    const dot = e.target.closest('.hero-dots .dot');
    if (dot && dot.dataset.slide) {
        currentSlide(Number(dot.dataset.slide));
        return;
    }

    const modalTrigger = e.target.closest('[data-modal]');
    if (modalTrigger) {
        openModal(modalTrigger.dataset.modal);
        return;
    }

    if (e.target.closest('.modal-close')) {
        closeModal();
    }
});

/* ===== IMÁGENES CON FALLBACK ===== */
document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.fallback && !img.dataset.fallbackApplied) {
        img.dataset.fallbackApplied = 'true';
        img.src = img.dataset.fallback;
    }
}, true);

/* ===== CARROUSEL HERO ===== */
let posicion = 0;
let slideIntervalId = null;
const SLIDE_INTERVAL = 10000;

const slideData = [
    {
        title: 'A veces, lo que más necesita un chico para no abandonar la escuela es alguien que crea en él.',
        description: 'Tu tiempo puede cambiar una historia.',
        buttonText: 'Quiero ser voluntario',
        buttonHref: 'pages/quiero-ayudar.html'
    },
    {
        title: 'Ningún sueño debería quedar incompleto por falta de oportunidades.',
        description: 'Ayudanos a llenar cuadernos y abrir caminos.',
        buttonText: 'Quiero Donar',
        buttonHref: 'pages/quiero-ayudar.html'
    },
    {
        title: 'En cada barrio hay chicos con ganas de aprender.',
        description: 'Ayudanos a acercarles un lugar seguro para estudiar.',
        buttonText: 'Quiero ofrecer un espacio',
        buttonHref: 'pages/quiero-ayudar.html'
    },
    {
        title: 'Cuando las herramientas en casa no alcanzan, la comunidad se vuelve familia.',
        description: 'Encontrá el lugar más cercano para que nadie aprenda en soledad.',
        buttonText: 'Buscar Puntos de Encuentro',
        buttonHref: 'pages/mapa.html'
    }
];

function activarImagen(index) {
    const imagenes = document.querySelectorAll('.slides img');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroBtn = document.getElementById('hero-btn');
    const heroContent = document.querySelector('.hero-content');
    const dots = document.querySelectorAll('.hero-dots .dot');

    if (imagenes.length === 0) return;

    posicion = index;

    imagenes.forEach((img) => img.classList.remove('active'));
    imagenes[posicion].classList.add('active');

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === posicion);
    });

    if (heroTitle && heroDesc && heroBtn && heroContent && slideData[posicion]) {
        heroContent.classList.add('is-fading');
        setTimeout(() => {
            heroTitle.textContent = slideData[posicion].title;
            heroDesc.textContent = slideData[posicion].description;
            heroBtn.textContent = slideData[posicion].buttonText;
            heroBtn.href = slideData[posicion].buttonHref;
            heroContent.classList.remove('is-fading');
        }, 220);
    }
}

function resetSlideInterval() {
    if (slideIntervalId) {
        clearInterval(slideIntervalId);
    }

    slideIntervalId = setInterval(siguiente, SLIDE_INTERVAL);
}

function currentSlide(n) {
    const imagenes = document.querySelectorAll('.slides img');
    if (imagenes.length === 0) return;

    let index = n - 1;
    if (index < 0) {
        index = imagenes.length - 1;
    } else if (index >= imagenes.length) {
        index = 0;
    }

    activarImagen(index);
    resetSlideInterval();
}

function siguiente() {
    const imagenes = document.querySelectorAll('.slides img');
    if (imagenes.length === 0) return;

    let next = posicion + 1;
    if (next >= imagenes.length) {
        next = 0;
    }

    activarImagen(next);
}

document.addEventListener('DOMContentLoaded', () => {
    const imagenes = document.querySelectorAll('.slides img');
    if (imagenes.length > 0) {
        activarImagen(0);
        resetSlideInterval();
    }

    initNavbarScroll();
});

/* ===== NAVBAR FIJO + COMPACTO AL SCROLL ===== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const SCROLL_THRESHOLD = 60;

    function updateNavbar() {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > SCROLL_THRESHOLD);
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

/* ===== QUIERO AYUDAR MODALS (Dynamic) ===== */
function getFormSection(title, svgPath, content) {
    return `
    <div class="form-section">
        <div class="form-section-title">
            <svg viewBox="0 0 24 24"><path d="${svgPath}"/></svg>
            ${title}
        </div>
        ${content}
    </div>`;
}

const FORM_ICONS = {
    datos: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    ubicacion: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    motivacion: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    comentarios: 'M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z',
    disponibilidad: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    movilidad: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
    perfil: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    espacio: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    materiales: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    entrega: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z'
};

function getOptionalLabel(text) {
    return `<label class="form-label-optional">${text}</label>`;
}

const PHONE_INPUT_ATTRS = ' inputmode="numeric" pattern="[0-9]{6,15}" title="Ingresá solo números, sin espacios ni guiones" autocomplete="tel"';
const NON_NEGATIVE_NUMBER_ATTRS = ' min="0" step="1" inputmode="numeric" title="Ingresá solo números mayores o iguales a 0"';

function getSubmitButton(text) {
    return `<div class="form-submit-container"><button type="submit" class="btn-submit">${text}</button></div>`;
}

function getDatosBasicosSection(options = {}) {
    const {
        suffix = '',
        telefonoOptional = false,
        includeEdad = false,
        orgMode = false,
        extraSecondField = ''
    } = options;

    const nombreName = orgMode ? 'nombre_org' : (suffix ? `nombre_${suffix}` : 'nombre');
    const emailName = orgMode ? 'email_org' : (suffix ? `email_${suffix}` : 'email');
    const telefonoName = orgMode ? 'telefono_org' : (suffix ? `telefono_${suffix}` : 'telefono');
    const nombreLabel = orgMode ? 'Nombre de la organización/persona' : 'Nombre y apellido';
    const telefonoLabel = telefonoOptional
        ? getOptionalLabel('Teléfono (opcional)')
        : '<label>Teléfono</label>';
    const telefonoAttrs = telefonoOptional ? '' : ' required';

    let contactoExtra = telefonoOptional
        ? `<div class="form-group">
                ${telefonoLabel}
                <input type="tel" name="${telefonoName}"${PHONE_INPUT_ATTRS}${telefonoAttrs}>
            </div>`
        : `<div class="form-row">
                <div class="form-group">
                    ${telefonoLabel}
                    <input type="tel" name="${telefonoName}"${PHONE_INPUT_ATTRS}${telefonoAttrs}>
                </div>
                ${includeEdad ? `
                <div class="form-group">
                    ${getOptionalLabel('Edad (opcional)')}
                    <input type="number" name="edad"${NON_NEGATIVE_NUMBER_ATTRS}>
                </div>` : extraSecondField}
            </div>`;

    return getFormSection('Datos básicos', FORM_ICONS.datos, `
        <div class="form-row">
            <div class="form-group">
                <label>${nombreLabel}</label>
                <input type="text" name="${nombreName}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="${emailName}" required>
            </div>
        </div>
        ${contactoExtra}
    `);
}

function getMensajeSection({ sectionTitle, label, name, placeholder = '', optional = false }) {
    const labelHtml = optional ? getOptionalLabel(label) : `<label>${label}</label>`;

    return getFormSection(sectionTitle, FORM_ICONS.motivacion, `
        <div class="form-group">
            ${labelHtml}
            <textarea name="${name}" placeholder="${placeholder}"></textarea>
        </div>
    `);
}

function getComentariosSection(name, placeholder, sectionTitle = 'Comentarios adicionales') {
    return getFormSection(sectionTitle, FORM_ICONS.comentarios, `
        <div class="form-group">
            <textarea name="${name}" placeholder="${placeholder}"></textarea>
        </div>
    `);
}

const PARTIDOS_GBA = [
    'Almirante Brown',
    'Avellaneda',
    'Berazategui',
    'Florencio Varela',
    'Hurlingham',
    'La Matanza',
    'Lanús',
    'Lomas de Zamora',
    'Merlo',
    'Morón',
    'Quilmes',
    'San Fernando',
    'San Isidro',
    'San Martín',
    'San Miguel',
    'Tigre',
    'Tres de Febrero',
    'Vicente López'
];

function getPartidoOptions() {
    return PARTIDOS_GBA
        .map((partido) => `<option value="${partido}">${partido}</option>`)
        .join('\n                    ');
}

function getUbicacionSection(suffix = '') {
    const zonaName = suffix ? `zona_${suffix}` : 'zona';
    const partidoName = suffix ? `partido_${suffix}` : 'partido';
    return getFormSection('Ubicación', FORM_ICONS.ubicacion,
        `<div class="form-row">
            <div class="form-group">
                <label>Zona / Municipio</label>
                <input type="text" name="${zonaName}" required>
            </div>
            <div class="form-group">
                <label>Partido / Municipio (GBA)</label>
                <select name="${partidoName}" required>
                    <option value="" disabled selected>Seleccione un partido</option>
                    ${getPartidoOptions()}
                    <option value="Otro">Otro</option>
                </select>
            </div>
        </div>`
    );
}

const MODAL_SUCCESS_MESSAGES = {
    general: {
        title: 'Gracias por ser parte.',
        paragraphs: [
            'Detrás de cada cuaderno, cada hora de acompañamiento y cada espacio compartido, hay una oportunidad más para que alguien pueda seguir aprendiendo.',
            'Recibimos tu información y nos vamos a comunicar por mail para conversar sobre los próximos pasos.'
        ]
    },
    dinero: {
        title: 'Gracias por querer colaborar.',
        paragraphs: [
            'Tu aporte puede transformarse en útiles, materiales y oportunidades para que más chicos y adolescentes continúen aprendiendo.',
            'En breve te enviaremos por mail el enlace de pago para completar tu donación.'
        ]
    },
    contacto: {
        title: '¡Mensaje enviado!',
        paragraphs: [
            'Gracias por contactarte con nosotros. Recibimos tu consulta y te responderemos por mail a la brevedad.'
        ]
    }
};

function getModalSuccessContent(type) {
    const content = MODAL_SUCCESS_MESSAGES[type] || MODAL_SUCCESS_MESSAGES.general;

    if (content.paragraphs.length === 1) {
        return `
        <div class="modal-content">
            <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
            <div class="modal-header modal-header--success">
                <h2>${content.title}</h2>
            </div>
            <div class="modal-success-footer">
                <p>${content.paragraphs[0]}</p>
            </div>
        </div>
        `;
    }

    const [lead, footer] = content.paragraphs;

    return `
        <div class="modal-content">
            <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
            <div class="modal-header modal-header--success">
                <h2>${content.title}</h2>
                <p>${lead}</p>
            </div>
            <div class="modal-success-footer">
                <p>${footer}</p>
            </div>
        </div>
    `;
}

function openSuccessModal(type) {
    activeModalOverlay = document.createElement('div');
    activeModalOverlay.classList.add('modal-overlay');
    activeModalOverlay.id = 'modal-success';
    activeModalOverlay.innerHTML = getModalSuccessContent(type);
    document.body.appendChild(activeModalOverlay);
    void activeModalOverlay.offsetWidth;
    activeModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showModalSuccess(overlay, type) {
    overlay.innerHTML = getModalSuccessContent(type);
}

function validateModalForm(form) {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    const checkboxRules = {
        movilidad: 'Seleccioná al menos una opción de movilidad.',
        disponibilidad: 'Seleccioná al menos una opción de disponibilidad.',
        tipo_espacio: 'Seleccioná al menos un tipo de espacio.',
        dias_espacio: 'Seleccioná al menos un día de disponibilidad.',
        materiales: 'Seleccioná al menos un material para donar.'
    };

    const groupsToValidate = [];
    const modal = form.closest('.modal-overlay');

    if (modal?.id === 'modal-voluntario') {
        groupsToValidate.push('movilidad', 'disponibilidad');
    } else if (modal?.id === 'modal-espacio') {
        groupsToValidate.push('tipo_espacio', 'dias_espacio');
    } else if (form.dataset.tipo === 'materiales') {
        groupsToValidate.push('materiales');
    }

    for (const name of groupsToValidate) {
        if (!form.querySelector(`input[name="${name}"]:checked`)) {
            alert(checkboxRules[name]);
            return false;
        }
    }

    return true;
}

function getFormDataObject(form) {
    const formData = new FormData(form);
    const datos = {};

    for (const [key, value] of formData.entries()) {
        if (datos[key]) {
            if (!Array.isArray(datos[key])) {
                datos[key] = [datos[key]];
            }
            datos[key].push(value);
        } else {
            datos[key] = value;
        }
    }

    return datos;
}

function getModalSuccessType(form) {
    if (form.classList.contains('donacion-form') && form.dataset.tipo === 'dinero') {
        return 'dinero';
    }

    return 'general';
}

function getModalContent(id) {
    if (id === 'modal-voluntario') {
        return `
        <div class="modal-content">
            <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
            <div class="modal-header">
                <h2>Quiero ser voluntario</h2>
                <p>Tu acompañamiento puede cambiar una trayectoria escolar, devolver confianza y ganas de aprender.</p>
            </div>
            <div class="modal-body">
                <form class="site-form">
                ${getDatosBasicosSection({ includeEdad: true })}

                ${getUbicacionSection()}

                ${getFormSection('Movilidad', FORM_ICONS.movilidad, `
                    <div class="form-group">
                        <label>Disponibilidad geográfica</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="movilidad" value="cerca"> Prefiero colaborar cerca de mi zona</label>
                            <label><input type="checkbox" name="movilidad" value="otros"> Puedo participar en otros municipios del Conurbano Bonaerense (GBA)</label>
                            <label><input type="checkbox" name="movilidad" value="propia"> Tengo movilidad propia</label>
                        </div>
                    </div>`
                )}

                ${getFormSection('Perfil del voluntario', FORM_ICONS.datos, `
                    <div class="form-group">
                        <label>¿Cómo te identificás?</label>
                        <div class="radio-group">
                            <label><input type="radio" name="perfil" value="docente" required> Docente o profesional de la educación</label>
                            <label><input type="radio" name="perfil" value="estudiante"> Estudiante terciario o universitario</label>
                            <label><input type="radio" name="perfil" value="profesional"> Profesional de otra área</label>
                            <label><input type="radio" name="perfil" value="comunitario"> Voluntario/a comunitario/a</label>
                            <label><input type="radio" name="perfil" value="sin_experiencia"> Quiero ayudar, aunque no tenga experiencia educativa</label>
                        </div>
                    </div>`
                )}

                ${getFormSection('Disponibilidad', FORM_ICONS.disponibilidad, `
                    <div class="checkbox-group checkbox-row">
                        <label><input type="checkbox" name="disponibilidad" value="manana"> Mañana</label>
                        <label><input type="checkbox" name="disponibilidad" value="tarde"> Tarde</label>
                        <label><input type="checkbox" name="disponibilidad" value="noche"> Noche</label>
                        <label><input type="checkbox" name="disponibilidad" value="semana"> Entre semana</label>
                        <label><input type="checkbox" name="disponibilidad" value="finde"> Fines de semana</label>
                    </div>`
                )}

                ${getMensajeSection({
                    sectionTitle: 'Motivación',
                    label: '¿Querés contarnos qué te motivó a sumarte?',
                    name: 'motivacion',
                    placeholder: 'Mensaje (opcional)',
                    optional: true
                })}

                ${getSubmitButton('Enviar solicitud')}
                </form>
            </div>
        </div>
        `;
    } else if (id === 'modal-espacio') {
        return `
        <div class="modal-content">
            <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
            <div class="modal-header">
                <h2>Ofrecer un espacio</h2>
                <p>Tu lugar puede transformarse en un nuevo punto de encuentro para aprender</p>
            </div>
            <div class="modal-body">
                <form class="site-form">
                    ${getFormSection('Perfil', FORM_ICONS.perfil, `
                        <div class="form-group">
                            <label>¿Quién ofrece el espacio?</label>
                            <div class="radio-group">
                                <label><input type="radio" name="tipo_entidad" value="organizacion" required> Organización / Asociación civil</label>
                                <label><input type="radio" name="tipo_entidad" value="empresa"> Empresa</label>
                                <label><input type="radio" name="tipo_entidad" value="institucion"> Institución educativa</label>
                                <label><input type="radio" name="tipo_entidad" value="club"> Club / espacio comunitario</label>
                                <label><input type="radio" name="tipo_entidad" value="particular"> Particular</label>
                            </div>
                        </div>`
                    )}

                    ${getDatosBasicosSection({
                        orgMode: true,
                        extraSecondField: `
                            <div class="form-group">
                                <label>Capacidad estimada</label>
                                <input type="number" name="capacidad_espacio"${NON_NEGATIVE_NUMBER_ATTRS} placeholder="Ej: 15 personas">
                            </div>`
                    })}

                    ${getUbicacionSection('espacio')}

                    ${getFormSection('Tipo de espacio', FORM_ICONS.espacio, `
                        <div class="form-group">
                            <label>¿Qué espacio físico podrías poner a disposición?</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="tipo_espacio" value="salon"> Salón</label>
                                <label><input type="checkbox" name="tipo_espacio" value="biblioteca"> Biblioteca</label>
                                <label><input type="checkbox" name="tipo_espacio" value="aula"> Aula</label>
                                <label><input type="checkbox" name="tipo_espacio" value="compartido"> Espacio compartido</label>
                                <label><input type="checkbox" name="tipo_espacio" value="otro"> Otro</label>
                            </div>
                        </div>`
                    )}

                    ${getFormSection('Disponibilidad', FORM_ICONS.disponibilidad, `
                        <div class="checkbox-group checkbox-row checkbox-row-spaced">
                            <label><input type="checkbox" name="dias_espacio" value="lunes"> Lunes</label>
                            <label><input type="checkbox" name="dias_espacio" value="martes"> Martes</label>
                            <label><input type="checkbox" name="dias_espacio" value="miercoles"> Miércoles</label>
                            <label><input type="checkbox" name="dias_espacio" value="jueves"> Jueves</label>
                            <label><input type="checkbox" name="dias_espacio" value="viernes"> Viernes</label>
                            <label><input type="checkbox" name="dias_espacio" value="sabado"> Sábado</label>
                        </div>`
                    )}

                    ${getFormSection('Condiciones', FORM_ICONS.check, `
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="condiciones" value="mesas"> Tiene mesas/sillas</label>
                            <label><input type="checkbox" name="condiciones" value="bano"> Tiene acceso a baño</label>
                            <label><input type="checkbox" name="condiciones" value="wifi"> Tiene WiFi</label>
                            <label><input type="checkbox" name="condiciones" value="menores"> Es accesible para menores</label>
                        </div>`
                    )}

                    ${getComentariosSection('comentarios_espacio', '¿Algo más que nos quieras contar sobre el espacio?')}

                    ${getSubmitButton('Enviar solicitud')}
                </form>
            </div>
        </div>
        `;
    } else if (id === 'modal-donacion') {
        return `
        <div class="modal-content">
            <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
            <div class="modal-header">
                <h2>Hacé una donación</h2>
                <p>Cada donación ayuda a sostener los espacios de apoyo escolar, preparar materiales y acompañar a chicos y adolescentes que necesitan una red para continuar su trayectoria educativa.</p>
                </div>
            <div class="modal-body">
                <p class="donacion-elegir"><strong>Elegí cómo querés colaborar</strong></p>

                <div class="donacion-tabs" role="tablist">
                    <button type="button" class="form-choice-btn donacion-tab active" data-tab="dinero" role="tab" aria-selected="true">Dinero</button>
                    <button type="button" class="form-choice-btn donacion-tab" data-tab="materiales" role="tab" aria-selected="false">Útiles escolares o materiales educativos</button>
                </div>

                <div class="donacion-panel active" id="panel-dinero" role="tabpanel">
                    <form class="site-form donacion-form" data-tipo="dinero">
                        <div class="form-section form-section--lead">
                            <div class="form-section-title">Donación de dinero</div>
                        </div>

                        <div class="form-group">
                            <label>Elegí un monto</label>
                            <div class="form-choice-group">
                                <button type="button" class="form-choice-btn active" data-monto="5000">$5.000</button>
                                <button type="button" class="form-choice-btn" data-monto="10000">$10.000</button>
                                <button type="button" class="form-choice-btn" data-monto="20000">$20.000</button>
                                <button type="button" class="form-choice-btn" data-monto="50000">$50.000</button>
                            </div>
                            <input type="hidden" name="monto" id="donacion-monto-seleccionado" value="5000">
                            <p class="form-note form-note-spaced">Los montos están expresados en Pesos Argentinos (ARS $)</p>
                        </div>

                        <div class="form-group">
                            ${getOptionalLabel('Otro monto: $')}
                            <input type="number" id="donacion-monto-otro" name="monto_otro" placeholder="Ingresá un monto" min="1">
                        </div>

                        <div class="form-highlight-box">
                            <h4 class="form-highlight-box__title">Calculadora de impacto</h4>
                            <p class="form-label-optional form-highlight-box__label">Con tu aporte estimado podemos:</p>
                            <p class="form-highlight-box__text" id="donacion-impacto-resultado"></p>
                            <p class="form-note">Los ejemplos son estimativos y se actualizan según los costos de los materiales y las necesidades de cada comunidad.</p>
                        </div>

                        ${getDatosBasicosSection()}

                        ${getMensajeSection({
                            sectionTitle: 'Motivación',
                            label: '¿Querés contarnos qué te motivó a donar?',
                            name: 'motivacion',
                            placeholder: 'Mensaje (opcional)',
                            optional: true
                        })}

                        ${getSubmitButton('Continuar con la donación')}
                    </form>
                </div>

                <div class="donacion-panel" id="panel-materiales" role="tabpanel">
                    <form class="site-form donacion-form" data-tipo="materiales">
                        <div class="form-section form-section--lead">
                            <div class="form-section-title">Donación de materiales</div>
                        </div>

                        ${getFormSection('¿Qué materiales querés donar?', FORM_ICONS.materiales, `
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="materiales" value="cuadernos"> Cuadernos</label>
                                <label><input type="checkbox" name="materiales" value="hojas_carpetas"> Hojas, carpetas y repuestos</label>
                                <label><input type="checkbox" name="materiales" value="lapices"> Lápices, lapiceras, fibras y marcadores</label>
                                <label><input type="checkbox" name="materiales" value="mochilas"> Mochilas</label>
                                <label><input type="checkbox" name="materiales" value="libros"> Libros escolares o de lectura</label>
                                <label><input type="checkbox" name="materiales" value="geometria"> Calculadoras y útiles de geometría</label>
                                <label><input type="checkbox" name="materiales" value="tecnicos"> Materiales para escuelas técnicas</label>
                                <label><input type="checkbox" name="materiales" value="otro"> Otro</label>
                            </div>`
                        )}

                        ${getFormSection('Estado de los materiales', FORM_ICONS.check, `
                            <div class="radio-group">
                                <label><input type="radio" name="estado_materiales" value="nuevos" required> Nuevos</label>
                                <label><input type="radio" name="estado_materiales" value="muy_buen_estado"> En muy buen estado</label>
                                <label><input type="radio" name="estado_materiales" value="revisar"> Para revisar con el equipo</label>
                            </div>`
                        )}

                        <div class="form-section form-section--compact">
                            <div class="form-group">
                                <label>Cantidad aproximada</label>
                                <input type="text" name="cantidad_aproximada" placeholder="Ej: 2 mochilas, 10 cuadernos" required>
                            </div>
                        </div>

                        ${getDatosBasicosSection()}

                        ${getUbicacionSection('donacion')}

                        ${getFormSection('Entrega', FORM_ICONS.entrega, `
                            <div class="radio-group">
                                <label><input type="radio" name="entrega" value="punto_encuentro" required> Puedo acercar los materiales a un punto de encuentro</label>
                                <label><input type="radio" name="entrega" value="coordinar"> Necesito coordinar retiro o entrega</label>
                                <label><input type="radio" name="entrega" value="informacion"> Quiero recibir información antes de confirmar</label>
                            </div>`
                        )}

                        ${getComentariosSection('comentarios', 'Contanos cualquier detalle útil sobre tu donación')}

                        ${getSubmitButton('Quiero donar materiales')}
                    </form>
                </div>
            </div>
        </div>
        `;
    }
    return '';
}

const IMPACTO_DONACION = {
    5000: 'Aportar útiles básicos para acompañar las tareas de un estudiante.',
    10000: 'Ayudar a armar parte de un kit escolar con cuadernos, lapiceras y materiales esenciales.',
    20000: 'Contribuir a sostener encuentros de apoyo escolar y materiales de estudio para un grupo.',
    50000: 'Colaborar con la preparación de varios kits escolares o recursos para un punto de encuentro.'
};

function formatMontoImpacto(monto) {
    return '$' + Number(monto).toLocaleString('es-AR');
}

function getImpactoPorMonto(monto) {
    const valor = Number(monto);
    if (!valor || valor <= 0) {
        return 'Seleccioná un monto para ver el impacto estimado de tu aporte.';
    }

    const montos = [5000, 10000, 20000, 50000];

    if (montos.includes(valor)) {
        return `${formatMontoImpacto(valor)}: ${IMPACTO_DONACION[valor]}`;
    }

    let montoReferencia = montos[0];
    for (const m of montos) {
        if (valor >= m) {
            montoReferencia = m;
        }
    }

    return `${formatMontoImpacto(valor)}: ${IMPACTO_DONACION[montoReferencia]}`;
}

function initDonacionModal(overlay) {
    const tabs = overlay.querySelectorAll('.donacion-tab');
    const panels = overlay.querySelectorAll('.donacion-panel');
    const montoBtns = overlay.querySelectorAll('.form-choice-btn[data-monto]');
    const montoInput = overlay.querySelector('#donacion-monto-seleccionado');
    const montoOtro = overlay.querySelector('#donacion-monto-otro');
    const impactoTexto = overlay.querySelector('#donacion-impacto-resultado');

    function actualizarImpacto(monto) {
        if (impactoTexto) {
            impactoTexto.textContent = getImpactoPorMonto(monto);
        }
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach((item) => {
                item.classList.toggle('active', item === tab);
                item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
            });

            panels.forEach((panel) => {
                panel.classList.toggle('active', panel.id === `panel-${target}`);
            });
        });
    });

    montoBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            montoBtns.forEach((item) => item.classList.remove('active'));
            btn.classList.add('active');

            if (montoInput) {
                montoInput.value = btn.dataset.monto;
            }

            if (montoOtro) {
                montoOtro.value = '';
            }

            actualizarImpacto(btn.dataset.monto);
        });
    });

    if (montoOtro) {
        montoOtro.addEventListener('input', () => {
            montoBtns.forEach((item) => item.classList.remove('active'));

            if (montoOtro.value) {
                if (montoInput) {
                    montoInput.value = montoOtro.value;
                }
                actualizarImpacto(montoOtro.value);
            } else if (montoInput) {
                montoInput.value = '5000';
                montoBtns[0]?.classList.add('active');
                actualizarImpacto(5000);
            }
        });
    }

    actualizarImpacto(montoInput?.value || 5000);
}

let activeModalOverlay = null;

function openModal(id) {
    activeModalOverlay = document.createElement('div');
    activeModalOverlay.classList.add('modal-overlay');
    activeModalOverlay.id = id;
    activeModalOverlay.innerHTML = getModalContent(id);
    document.body.appendChild(activeModalOverlay);
    void activeModalOverlay.offsetWidth;
    activeModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (id === 'modal-donacion') {
        initDonacionModal(activeModalOverlay);
    }
}

function closeModal() {
    if (activeModalOverlay) {
        activeModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            if (activeModalOverlay && activeModalOverlay.parentNode) {
                activeModalOverlay.parentNode.removeChild(activeModalOverlay);
            }
            activeModalOverlay = null;
        }, 300);
    }
}

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

/* ===== FORMULARIO (FormData) ===== */
document.addEventListener('submit', (e) => {
    if (e.target.tagName !== 'FORM') {
        return;
    }

    e.preventDefault();

    const modal = e.target.closest('.modal-overlay');

    if (modal) {
        if (!validateModalForm(e.target)) {
            return;
        }

        console.log('Datos enviados:', getFormDataObject(e.target));
        showModalSuccess(modal, getModalSuccessType(e.target));
        return;
    }

    if (e.target.closest('.contact-form-section')) {
        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }

        console.log('Datos enviados:', getFormDataObject(e.target));
        e.target.reset();
        openSuccessModal('contacto');
        return;
    }

    console.log('Datos enviados:', getFormDataObject(e.target));
    e.target.reset();
});

function sanitizePhoneValue(value) {
    return value.replace(/\D/g, '');
}

function sanitizeNonNegativeInteger(value) {
    const digits = value.replace(/\D/g, '');
    if (digits === '') {
        return '';
    }

    return String(Math.max(0, parseInt(digits, 10)));
}

document.addEventListener('input', (e) => {
    if (e.target.type === 'tel') {
        const sanitized = sanitizePhoneValue(e.target.value);
        if (e.target.value !== sanitized) {
            e.target.value = sanitized;
        }
        return;
    }

    if (e.target.name === 'edad' || e.target.name === 'capacidad_espacio') {
        const sanitized = sanitizeNonNegativeInteger(e.target.value);
        if (e.target.value !== sanitized) {
            e.target.value = sanitized;
        }
    }
});