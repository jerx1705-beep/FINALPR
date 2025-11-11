// ============ DATOS ============
const libros = [
    { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", precio: 250, categoria: "infantil", descripcion: "Una fábula poética para todas las edades", calificacion: "⭐⭐⭐⭐⭐", imagen: "https://www.edicontinente.com.ar/image/titulos/9788419087492.jpg" },
    { id: 2, titulo: "El Quijote", autor: "Miguel de Cervantes", precio: 300, categoria: "ficcion", descripcion: "La obra maestra de la literatura española", calificacion: "⭐⭐⭐⭐⭐", imagen: "https://i.calameoassets.com/210424024139-58f29e42bd0506f490602a4d52459364/large.jpg" },
    { id: 3, titulo: "la abuelita Gangster", autor: "David Williams", precio: 260, categoria: "infantil", descripcion: "una abuelita no tan abuelita", calificacion: "⭐⭐⭐⭐⭐", imagen: "https://tienda.sophosenlinea.com/imagenes/9786073/978607311856.webp" },

    { id: 4, titulo: "La Casa de los Espíritus", autor: "Isabel Allende", precio: 200, categoria: "novela", descripcion: "Una saga familiar llena de magia", calificacion: "⭐⭐⭐⭐", imagen: "https://demuseo.com/wp-content/uploads/2022/04/P86203C-scaled.jpg" },
    { id: 5, titulo: "El Código Da Vinci", autor: "Dan Brown", precio: 230, categoria: "suspenso", descripcion: "Un misterio envolvente y adictivo", calificacion: "⭐⭐⭐⭐", imagen: "https://tienda.sophosenlinea.com/imagenes/9786070/978607074494.webp" },
    { id: 6, titulo: "Harry Potter y la Piedra Filosofal", autor: "J.K. Rowling", precio: 150, categoria: "infantil", descripcion: "El inicio de una aventura mágica", calificacion: "⭐⭐⭐⭐⭐", imagen: "https://cdn.kemik.gt/2022/03/9788418173004-Harry20Portter20120y20la20Piedra20Filosofal-1200X1200-1.jpg" },
    { id: 7, titulo: "Hábitos Atómicos", autor: "James Clear", precio: 180, categoria: "autoayuda", descripcion: "Transforma tu vida con pequeños cambios", calificacion: "⭐⭐⭐⭐", imagen: "https://imghop.udocz.com/uploads/book/cover/317168/317168.jpg" },
    { id: 8, titulo: "Orgullo y Prejuicio", autor: "Jane Austen", precio: 330, categoria: "ficcion", descripcion: "Un romance clásico y cautivador", calificacion: "⭐⭐⭐⭐", imagen: "https://images.justwatch.com/poster/203481059/s718/orgullo-y-prejuicio.jpg" },
    { id: 9, titulo: "El Hobbit", autor: "J.R.R. Tolkien", precio: 220, categoria: "ficcion", descripcion: "Una aventura fantástica memorable", calificacion: "⭐⭐⭐⭐⭐", imagen: "https://tharaiticketu.files.wordpress.com/2014/07/the-hobbit-the-battle-of-the-five-armies-poster.jpg?w=382&h=568&crop=1" },
    { id: 10, titulo: "1984", autor: "George Orwell", precio: 170, categoria: "suspenso", descripcion: "Una distopía inquietante y profunda", calificacion: "⭐⭐⭐⭐", imagen: "https://lectorvoraz.com/wp-content/uploads/2022/11/978849989094.jpg" },
    { id: 11, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", precio: 225, categoria: "novela", descripcion: "Un clásico del realismo mágico", calificacion: "⭐⭐⭐⭐⭐", imagen: "https://m.media-amazon.com/images/M/MV5BMjFjNTdiMmQtZjQ5Yi00MWMzLWJjMWMtNmI1ZTgzYmE5NjNiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
];


let carrito = [];
let usuarioLogueado = null;

// ============ INICIALIZACIÓN ============
window.addEventListener('load', () => {
    verificarSesion();
    if (usuarioLogueado) {
        mostrarPaginaPrincipal();
        cargarLibros();
    }
});

// ============ AUTENTICACIÓN ============
function cambiarTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
    event.target.classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuarioLogin').value;
    const password = document.getElementById('passwordLogin').value;

    if (usuario === 'alumno' && password === '2025') {
        usuarioLogueado = { nombre: 'Alumno', usuario: usuario };
        sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
        mostrarPaginaPrincipal();
        cargarLibros();
        document.getElementById('usuarioLogin').value = '';
        document.getElementById('passwordLogin').value = '';
    } else {
        alert('❌ Credenciales incorrectas.\nUsa: alumno / 2025');
    }
}

function handleRegistro(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreReg').value;
    const email = document.getElementById('emailReg').value;
    const password = document.getElementById('passwordReg').value;
    const direccion = document.getElementById('direccionReg').value;
    const telefono = document.getElementById('telefonoReg').value;

    usuarioLogueado = { nombre, email, direccion, telefono };
    sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
    mostrarPaginaPrincipal();
    cargarLibros();
    document.getElementById('formularioRegistro').reset();
}

function verificarSesion() {
    const sesion = sessionStorage.getItem('usuarioLogueado');
    if (sesion) {
        usuarioLogueado = JSON.parse(sesion);
    }
}

function mostrarPaginaPrincipal() {
    document.getElementById('modalLogin').style.display = 'none';
    document.getElementById('paginaPrincipal').style.display = 'block';
    document.getElementById('nombreUsuario').textContent = usuarioLogueado.nombre;
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
        sessionStorage.removeItem('usuarioLogueado');
        usuarioLogueado = null;
        carrito = [];
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnCerrar = document.getElementById('btnCerrarSesion');
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarSesion);
});

// ============ LIBROS ============
function cargarLibros() {
    const container = document.getElementById('librosContainer');
    container.innerHTML = '';
    libros.forEach(libro => {
        container.innerHTML += `
            <div class="libro-card">
                <div class="libro-imagen"><img src="${libro.imagen}" alt="${libro.titulo}" style="width: 100%; height: 100%; object-fit: cover;"></div>
                <div class="libro-info">
                    <div class="libro-titulo">${libro.titulo}</div>
                    <div class="libro-autor">por ${libro.autor}</div>
                    <span class="libro-categoria">${libro.categoria}</span>
                    <p class="libro-descripcion">${libro.descripcion}</p>
                    <div class="libro-calificacion">${libro.calificacion}</div>
                    <div class="libro-precio">${libro.precio.toFixed(2)}</div>
                    <button class="btn-agregar" onclick="agregarAlCarrito(${libro.id})">🛒 Agregar</button>
                </div>
            </div>
        `;
    });
}

function filtrarLibros() {
    const categoria = document.getElementById('filtroCategoria').value;
    const container = document.getElementById('librosContainer');
    container.innerHTML = '';
    
    const filtrados = categoria === '' ? libros : libros.filter(l => l.categoria === categoria);
    filtrados.forEach(libro => {
        container.innerHTML += `
            <div class="libro-card">
                <div class="libro-imagen"><img src="${libro.imagen}" alt="${libro.titulo}" style="width: 100%; height: 100%; object-fit: cover;"></div>
                <div class="libro-info">
                    <div class="libro-titulo">${libro.titulo}</div>
                    <div class="libro-autor">por ${libro.autor}</div>
                    <span class="libro-categoria">${libro.categoria}</span>
                    <p class="libro-descripcion">${libro.descripcion}</p>
                    <div class="libro-calificacion">${libro.calificacion}</div>
                    <div class="libro-precio">${libro.precio.toFixed(2)}</div>
                    <button class="btn-agregar" onclick="agregarAlCarrito(${libro.id})">🛒 Agregar</button>
                </div>
            </div>
        `;
    });
}

// ============ CARRITO ============
function agregarAlCarrito(id) {
    const libro = libros.find(l => l.id === id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...libro, cantidad: 1 });
    }

    actualizarContador();
    alert('✓ ' + libro.titulo + ' agregado al carrito');
}

function actualizarContador() {
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('contadorCarrito').textContent = total;
}

function abrirModalCarrito() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    let html = '';
    carrito.forEach(item => {
        html += `
            <div class="carrito-item">
                <div class="item-info">
                    <div class="item-titulo">${item.titulo}</div>
                    <div class="item-precio">$${item.precio.toFixed(2)}</div>
                </div>
                <div class="item-cantidad">
                    <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                    <input type="number" value="${item.cantidad}" onchange="cambiarCantidadDirecta(${item.id}, this.value)">
                    <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">✕</button>
            </div>
        `;
    });
    document.getElementById('carritoItems').innerHTML = html;
    actualizarResumen();
    document.getElementById('modalCarrito').style.display = 'block';
}

function cerrarModalCarrito() {
    document.getElementById('modalCarrito').style.display = 'none';
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) eliminarDelCarrito(id);
        else abrirModalCarrito();
    }
}

function cambiarCantidadDirecta(id, valor) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad = parseInt(valor) || 1;
        if (item.cantidad <= 0) eliminarDelCarrito(id);
        else abrirModalCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarContador();
    abrirModalCarrito();
}

function actualizarResumen() {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const impuesto = subtotal * 0.12;
    const total = subtotal + impuesto;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('impuesto').textContent = impuesto.toFixed(2);
    document.getElementById('totalCarrito').textContent = total.toFixed(2);
}

document.getElementById('btnCarrito')?.addEventListener('click', abrirModalCarrito);

// ============ CHECKOUT ============
function irACheckout() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    document.getElementById('modalCarrito').style.display = 'none';
    abrirModalCheckout();
}

function abrirModalCheckout() {
    // Mostrar resumen de libros
    let html = '';
    carrito.forEach(item => {
        const subtotal = (item.precio * item.cantidad).toFixed(2);
        html += `
            <div class="resumen-item">
                <strong>${item.titulo}</strong><br>
                Cantidad: ${item.cantidad} × Q${item.precio.toFixed(2)} = <strong>Q${subtotal}</strong>
            </div>
        `;
    });
    document.getElementById('resumenLibros').innerHTML = html;

    // Prellenar datos
    if (usuarioLogueado) {
        document.getElementById('nombre').value = usuarioLogueado.nombre || '';
        document.getElementById('emailCheckout').value = usuarioLogueado.email || '';
        document.getElementById('telefonoCheckout').value = usuarioLogueado.telefono || '';
        document.getElementById('direccionCheckout').value = usuarioLogueado.direccion || '';
    }

    actualizarTotalCheckout();

    // Agregar listeners a radio buttons
    document.querySelectorAll('input[name="envio"], input[name="pago"]').forEach(radio => {
        radio.addEventListener('change', actualizarTotalCheckout);
    });
    document.getElementById('regalo').addEventListener('change', actualizarTotalCheckout);

    document.getElementById('modalCheckout').style.display = 'block';
}

function actualizarTotalCheckout() {
    const costos = { estandar: 39.00, express: 116.00, urgente: 193.00 };
    const envio = document.querySelector('input[name="envio"]:checked').value;
    const costoEnvio = costos[envio];
    const regalo = document.getElementById('regalo').checked ? 15.50 : 0;

    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    const subtotalConAdicionales = subtotal + costoEnvio + regalo;
    const impuesto = subtotalConAdicionales * 0.16;
    const total = subtotalConAdicionales + impuesto;

    document.getElementById('detallesPago').innerHTML = `
        <div class="detalle-fila"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="detalle-fila"><span>Envío (${envio}):</span><span>$${costoEnvio.toFixed(2)}</span></div>
        ${regalo > 0 ? `<div class="detalle-fila"><span>Empaque regalo:</span><span>+$${regalo.toFixed(2)}</span></div>` : ''}
        <div class="detalle-fila"><span>Impuesto (16%):</span><span>$${impuesto.toFixed(2)}</span></div>
        <div class="detalle-fila detalle-total"><span>TOTAL:</span><span>$${total.toFixed(2)}</span></div>
    `;
}

function cerrarModalCheckout() {
    document.getElementById('modalCheckout').style.display = 'none';
}

function completarCompra() {
    // Validar
    if (!document.getElementById('nombre').value || !document.getElementById('emailCheckout').value || !document.getElementById('politicas').checked) {
        alert('❌ Completa todos los campos y acepta los términos');
        return;
    }

    // Recopilar datos
    const costos = { estandar: 39.00, express: 116.00, urgente: 193.00 };
    const envio = document.querySelector('input[name="envio"]:checked').value;
    const costoEnvio = costos[envio];
    const regalo = document.getElementById('regalo').checked ? 15.50 : 0;

    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    const subtotalConAdicionales = subtotal + costoEnvio + regalo;
    const impuesto = subtotalConAdicionales * 0.16;
    const total = subtotalConAdicionales + impuesto;

    const datosCompra = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        fecha: new Date().toLocaleDateString('es-ES'),
        hora: new Date().toLocaleTimeString('es-ES'),
        usuario: {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('emailCheckout').value,
            telefono: document.getElementById('telefonoCheckout').value,
            direccion: document.getElementById('direccionCheckout').value,
            ciudad: document.getElementById('ciudad').value,
            codigoPostal: document.getElementById('codigoPostal').value
        },
        pedido: carrito,
        envio: envio,
        pago: document.querySelector('input[name="pago"]:checked').value,
        regalo: document.getElementById('regalo').checked,
        notificacion: document.getElementById('notificacion').checked,
        notas: document.getElementById('notas').value,
        totales: { subtotal: subtotal.toFixed(2), envio: costoEnvio.toFixed(2), regalo: regalo.toFixed(2), impuesto: impuesto.toFixed(2), total: total.toFixed(2) }
    };

    mostrarConfirmacion(datosCompra);
}

// ============ CONFIRMACIÓN ============
function mostrarConfirmacion(datos) {
    let html = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #27ae60;">Número de Orden: ${datos.id}</h2>
            <p>Fecha: ${datos.fecha} | Hora: ${datos.hora}</p>
        </div>

        <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📋 Datos del Cliente</h3>
        <div class="detalle-fila"><span>Nombre:</span><span>${datos.usuario.nombre}</span></div>
        <div class="detalle-fila"><span>Email:</span><span>${datos.usuario.email}</span></div>
        <div class="detalle-fila"><span>Teléfono:</span><span>${datos.usuario.telefono}</span></div>
        <div class="detalle-fila"><span>Dirección:</span><span>${datos.usuario.direccion}</span></div>
        <div class="detalle-fila"><span>Ciudad:</span><span>${datos.usuario.ciudad}</span></div>

        <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 15px;">📦 Libros Comprados</h3>
    `;

    datos.pedido.forEach(item => {
        const subtotal = (item.precio * item.cantidad).toFixed(2);
        html += `<div class="detalle-fila"><span>Q{item.titulo} (xQ{item.cantidad})</span><span>Q{subtotal}</span></div>`;
    });

    html += `
        <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 15px;">💳 Detalles de Pago</h3>
        <div class="detalle-fila"><span>Subtotal:</span><span>$${datos.totales.subtotal}</span></div>
        <div class="detalle-fila"><span>Envío (${datos.envio}):</span><span>$${datos.totales.envio}</span></div>
        ${parseFloat(datos.totales.regalo) > 0 ? `<div class="detalle-fila"><span>Empaque regalo:</span><span>$${datos.totales.regalo}</span></div>` : ''}
        <div class="detalle-fila"><span>Impuesto (12%):</span><span>Q${datos.totales.impuesto}</span></div>
        <div class="detalle-fila detalle-total"><span style="font-size: 16px;">TOTAL:</span><span style="font-size: 16px;">$${datos.totales.total}</span></div>
        
        <p style="margin-top: 15px; background: #e8f8f5; padding: 15px; border-radius: 5px; color: #27ae60;">
            ✓ Se ha enviado un email de confirmación a <strong>${datos.usuario.email}</strong><br>
            ✓ Tu pedido será empacado y enviado en las próximas 24 horas
        </p>
    `;

    document.getElementById('confirmacionContenido').innerHTML = html;
    document.getElementById('modalCheckout').style.display = 'none';
    document.getElementById('modalConfirmacion').style.display = 'block';

    carrito = [];
    actualizarContador();
}

function volverATienda() {
    document.getElementById('modalConfirmacion').style.display = 'none';
    document.getElementById('modalCarrito').style.display = 'none';
    document.getElementById('modalCheckout').style.display = 'none';
}
