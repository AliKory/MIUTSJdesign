 // Obtener todas las publicaciones
 axios.get('/forum/posts')
 .then(function(response) {
     const posts = response.data;
     const postList = document.getElementById('post-list');

     posts.forEach(function(post) {
         const listItem = document.createElement('li');
         listItem.textContent = post.title;
         postList.appendChild(listItem);
     });
 })
 .catch(function(error) {
     console.error('Error al obtener las publicaciones:', error);
 });

// Obtener comentarios para una publicación específica
axios.get('/forum/posts/1/comments')
 .then(function(response) {
     const comments = response.data;
     const commentList = document.getElementById('comment-list');

     comments.forEach(function(comment) {
         const listItem = document.createElement('li');
         listItem.textContent = comment.content;
         commentList.appendChild(listItem);
     });
 })
 .catch(function(error) {
     console.error('Error al obtener los comentarios:', error);
 });