/*document.addEventListener('DOMContentLoaded', function() {
    fetch('https://662dae96a7dda1fa378b0efc.mockapi.io/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.titulo}</h2>
                    <img src="${post.imagen}" alt="${post.titulo}">
                    <p class="date">Fecha de publicación: ${post.fecha}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error al obtener las publicaciones:', error));
});*/