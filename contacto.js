document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioContacto');
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorAsunto = document.getElementById('errorAsunto');
    const errorMensaje = document.getElementById('errorMensaje');

    function crearMensajeExito() {
        let contenedor = document.querySelector('.success-message');
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.className = 'success-message';
            form.parentNode.insertBefore(contenedor, form);
        }
        return contenedor;
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function mostrarError(input, mensaje, elementoError) {
        elementoError.textContent = mensaje;
        input.classList.add('invalid');
    }

    function limpiarError(input, elementoError) {
        elementoError.textContent = '';
        input.classList.remove('invalid');
    }

    function limpiarMensajes() {
        limpiarError(form.nombre, errorNombre);
        limpiarError(form.email, errorEmail);
        limpiarError(form.asunto, errorAsunto);
        limpiarError(form.mensaje, errorMensaje);

        const mensajeExito = document.querySelector('.success-message');
        if (mensajeExito) {
            mensajeExito.classList.remove('visible');
            mensajeExito.textContent = '';
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        limpiarMensajes();

        let valido = true;
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const asunto = form.asunto.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (nombre.length < 3) {
            mostrarError(form.nombre, 'El nombre debe tener al menos 3 caracteres.', errorNombre);
            valido = false;
        }

        if (!validarEmail(email)) {
            mostrarError(form.email, 'Por favor ingresa un correo electrónico válido.', errorEmail);
            valido = false;
        }

        if (asunto.length < 5) {
            mostrarError(form.asunto, 'El asunto debe tener al menos 5 caracteres.', errorAsunto);
            valido = false;
        }

        if (mensaje.length < 10) {
            mostrarError(form.mensaje, 'El mensaje debe tener al menos 10 caracteres.', errorMensaje);
            valido = false;
        }

        if (!valido) {
            return;
        }

        const mensajeExito = crearMensajeExito();
        mensajeExito.textContent = '¡Gracias! Tu mensaje se ha enviado correctamente. Nos contactaremos pronto.';
        mensajeExito.classList.add('visible');
        form.reset();
    });

    form.addEventListener('input', function (event) {
        const elemento = event.target;
        if (elemento === form.nombre) limpiarError(form.nombre, errorNombre);
        if (elemento === form.email) limpiarError(form.email, errorEmail);
        if (elemento === form.asunto) limpiarError(form.asunto, errorAsunto);
        if (elemento === form.mensaje) limpiarError(form.mensaje, errorMensaje);
    });
});
