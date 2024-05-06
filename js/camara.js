document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-container');
    const btnCapturar = document.querySelector("button#btnCapturar");
    const imagenCapturada = document.querySelector("img#imgCamera");
    const inputCamera = document.createElement("input");
    inputCamera.type = "file";
    inputCamera.id = "inputCamera";
    inputCamera.accept = "camera";
    inputCamera.capture = "environment-facing";

    obtenerPosts();

    // Función para convertir la imagen a base64
    function convertirImagenAbase64() {
        const canvas = document.createElement("canvas");
        canvas.width = 500//imagenCapturada.width;
        canvas.height = 500//imagenCapturada.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imagenCapturada, 0, 0, imagenCapturada.width, imagenCapturada.height);
        return canvas.toDataURL("image/jpeg");
    }

    btnCapturar.addEventListener("click", () => {
        inputCamera.click();
    });

    inputCamera.addEventListener("change", () => {
        if (inputCamera.value !== "") {
            imagenCapturada.src = URL.createObjectURL(inputCamera.files[0]);
            mostrarModal();
        }
    });
    

    btnCancelar.addEventListener("click", () => {
        imagenCapturada.src = "";
        inputCamera.value = "";
        inputTitulo.value = "";
        ocultarModal();
    });

    btnPublicar.addEventListener("click", () => {
        const imagenBase64 = convertirImagenAbase64();
        const inputTitulo = document.getElementById("inputTitulo")
        const titulo = inputTitulo.value.trim();
        const fechaHoy = new Date();
        const fechaPublicacion = formatDate(fechaHoy);

        enviarDAtaALaAPI(imagenBase64, titulo, fechaPublicacion);
        imagenCapturada.src = "";
        inputCamera.value = "";
        inputTitulo.value = "";

        ocultarModal();
    });

    function enviarDAtaALaAPI(imagenBase64, titulo, fechaPublicacion) {
        fetch('https://66302cdec92f351c03d93333.mockapi.io/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imagen: imagenBase64,
                titulo: titulo,
                fecha: fechaPublicacion 
            }),
        })
        .then(response => response.json())
        .then(data => {
            agregarPost(data);
        })
        .catch(error => {
            console.error('Error al enviar la imagen a la API:', error);
        });
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('es-ES', options);
    }

    function mostrarModal() {
        const modal = document.getElementById("myModal");
        var imagenModal = document.getElementById("capturedImage");
        imagenModal.src = imagenCapturada.src;
        imagenModal.width = 300;
        modal.style.display = "block";
    }

    function ocultarModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function crearImagenNoPosts() {
        const noPostsElement = document.createElement('div');
        const imagen = document.createElement('img');
        imagen.src = rutaImagen;
        imagen.alt = "aún no hay posts";
        imagen.width = 300;
        imagen.style.display = "block";
        imagen.style.margin = "auto";
    }

    function crearMensajeNoPosts() {
        const noPostsMessage = document.createElement('p');
        noPostsMessage.textContent = 'Aún no hay posts.';
        noPostsMessage.style.textAlign = "center";
        noPostsElement.appendChild(imagen);
        postsContainer.appendChild(noPostsElement);
        postsContainer.appendChild(noPostsMessage);
    }

    function agregarPost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h4>${post.titulo}</h4>
            <img src="${post.imagen}" alt="${post.titulo}">
            <p class="date">Fecha de publicación: ${post.fecha}</p>
        `;
        postsContainer.appendChild(postElement);
    }

    function obtenerPosts() {
        fetch('https://66302cdec92f351c03d93333.mockapi.io/posts')
        .then(response => response.json())
        .then(posts => {
            const rutaImagen = "images/hamster.png";
            if (posts.length === 0) {
                crearImagenNoPosts();
                crearMensajeNoPosts();
            } else {
                posts.forEach(post => {
                    agregarPost(post);
                });
            }
        })
        .catch(error => console.error('Error al obtener las publicaciones:', error));
    }
});
