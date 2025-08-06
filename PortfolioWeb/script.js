const secciones = document.querySelectorAll('section');

const mostrarSeccion = () => {
    secciones.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', mostrarSeccion);
window.addEventListener('load', mostrarSeccion);

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");
    const estadoFormulario = document.getElementById("estado-formulario");

    formulario.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !email || !mensaje) {
            estadoFormulario.textContent = "Por favor, completa todos los campos.";
            estadoFormulario.style.color = "red";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            estadoFormulario.textContent = "Por favor, ingresa un correo válido.";
            estadoFormulario.style.color = "red";
            return;
        }

        try {
            const respuesta = await fetch(formulario.action, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    mensaje
                })
            });

            if (respuesta.ok) {
                estadoFormulario.textContent = "¡Mensaje enviado con éxito!";
                estadoFormulario.style.color = "green";
                formulario.reset();
            } else {
                estadoFormulario.textContent = "Error al enviar el mensaje.";
                estadoFormulario.style.color = "red";
            }
        } catch (error) {
            estadoFormulario.textContent = "Error de red. Intenta más tarde.";
            estadoFormulario.style.color = "red";
        }
    });
});
