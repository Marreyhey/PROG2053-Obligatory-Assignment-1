let page = 0; // Keeps track of the current page

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
    return postElement;
}

// Function to load posts from the JSONPlaceholder API
function loadPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&`)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const postsContainer = document.getElementById('posts');
            data.forEach(post => {
                postsContainer.appendChild(createPostElement(post));
            });
            page++; // Increment the page after successfully loading posts
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Function to detect when the user has scrolled to the bottom of the page
function endOfPage() {
    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadPosts(); // Load more posts
    }
}

// Initial load of posts
loadPosts();

window.addEventListener('scroll', endOfPage);
