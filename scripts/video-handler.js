document.addEventListener("DOMContentLoaded", () => {
    const botonesReproducir = document.querySelectorAll(".play-video");
    let videoActivo = null;

    botonesReproducir.forEach(boton => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            const proyecto = boton.closest(".proyecto");

            // Evitar múltiples reproducciones
            if (proyecto.querySelector("video")) return;

            // Si hay otro video activo, lo cerramos
            if (videoActivo) {
                restaurarImagen(videoActivo);
                videoActivo = null;
            }

            const videoSrc = boton.getAttribute("data-video");
            const imgSrc = boton.getAttribute("data-img");

            const imagen = proyecto.querySelector(".proyecto-imagen");
            if (imagen) imagen.remove();

            const video = document.createElement("video");
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.classList.add("proyecto-video");
            video.style.width = "50%";
            video.style.borderRadius = "10px";

            // Botón para cerrar manualmente
            const btnCerrar = document.createElement("button");
            btnCerrar.textContent = "✖";
            btnCerrar.classList.add("cerrar-video");
            btnCerrar.style.position = "absolute";
            btnCerrar.style.top = "10px";
            btnCerrar.style.right = "10px";
            btnCerrar.style.background = "rgba(0,0,0,0.6)";
            btnCerrar.style.color = "white";
            btnCerrar.style.border = "none";
            btnCerrar.style.fontSize = "18px";
            btnCerrar.style.cursor = "pointer";
            btnCerrar.style.zIndex = "10";

            btnCerrar.addEventListener("click", () => {
                video.remove();
                btnCerrar.remove();
                restaurarImagen(proyecto, imgSrc);
                videoActivo = null;
            });

            // Volver a imagen al terminar el video
            video.addEventListener("ended", () => {
                video.remove();
                btnCerrar.remove();
                restaurarImagen(proyecto, imgSrc);
                videoActivo = null;
            });

            proyecto.style.position = "relative";
            proyecto.insertBefore(video, proyecto.firstChild);
            proyecto.appendChild(btnCerrar);

            videoActivo = proyecto;
        });
    });

    function restaurarImagen(proyecto, imgSrc = "") {
        const nuevaImagen = document.createElement("img");
        nuevaImagen.src = imgSrc;
        nuevaImagen.alt = "Imagen del proyecto";
        nuevaImagen.classList.add("proyecto-imagen");
        nuevaImagen.style.width = "100%";
        nuevaImagen.style.borderRadius = "10px";
        proyecto.insertBefore(nuevaImagen, proyecto.firstChild);
    }
});
