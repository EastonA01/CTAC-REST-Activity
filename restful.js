// Declare API without additional args
const API = `https://jsonplaceholder.typicode.com/`

// Function to fetch data from the API
async function apiCaller(arguments) {
    let siteFetch = arguments
    try {
        const response = await siteFetch
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to generate HTML elements based on fetched data
function displayPosts(posts) {
    const container = document.getElementById('postsContainer');
    container.innerHTML = ''; // Clear previous content
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const userIdElement = document.createElement('p');
        userIdElement.textContent = `User ID: ${post.userId}`;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = post.body;

        postElement.appendChild(titleElement);
        postElement.appendChild(userIdElement);
        postElement.appendChild(bodyElement);

        container.appendChild(postElement);
    });
}

// Event listener for Fetch Posts button
document.getElementById('AllPosts').addEventListener('click', async function() {
    const posts = await apiCaller(fetch(`${API}posts`));
    displayPosts(posts);
});

// Event listener for Fetch Posts button
document.getElementById('all10').addEventListener('click', async function() {
    const posts10 = await apiCaller(fetch(`${API}posts?id=1`));
    displayPosts(posts10);
});

async function makeNewPost() {
    try {
        const response = await fetch(`${API}posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 1,
                title: "Hello world",
                body: "Coding is rewarding but tiring"
            })
        });
        if (response.ok) {
            const newPost = await response.json(); // Assuming API returns updated post data
            displayMessage(`ID of new post is ${newPost.id}`, 'success');
        } else {
            displayMessage(`Failed to make new post`, 'error');
        }
    } catch (error) {
        displayMessage(`Error making new post: ${error}`, 'error');
    }
}

// Event listener for New Posts button
document.getElementById('newPost').addEventListener('click', async function() {
    makeNewPost()
});

// Function to display JSON response in the HTML
function displayResponseJSON(data) {
    const responseContainer = document.getElementById('message');
    responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

async function replacePost(postId, newData) {
    try {
        const response = await fetch(`${API}posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            const replacedPost = await response.json();
            displayMessage(`Post with ID ${postId} replaced successfully`, 'success');
            displayResponseJSON(replacedPost);
        } else {
            displayMessage(`Failed to replace post with ID ${postId}`, 'error');
            displayResponseJSON(null);
        }
    } catch (error) {
        displayMessage(`Error replacing post: ${error}`, 'error');
        displayResponseJSON(null);
    }
}

// Event listener for replace post button
document.getElementById('replacePost').addEventListener('click', function() {
    const postId = 12; // Replace with the actual post ID you want to replace
    const newData = {
        userId: 1,
        id: 12,
        title: "Bonjour madame",
        body: "There once was a man named michael finnigan"
    };
    replacePost(postId, newData);
});

// Function to update the title of a post by ID
async function updatePostTitle(postId, newTitle) {
    try {
        const response = await fetch(`${API}posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle
            })
        });

        if (response.ok) {
            const updatedPost = await response.json(); // Assuming API returns updated post data
            displayMessage(`Title of post ID ${updatedPost.id} successfully updated`, 'success');
        } else {
            displayMessage(`Failed to update title of post with ID ${postId}`, 'error');
        }
    } catch (error) {
        displayMessage(`Error updating post title: ${error}`, 'error');
    }
}

// Event listener for update title button
document.getElementById('titleUpdate').addEventListener('click', function() {
    const postId = 12;
    const newTitle = 'Tried So hard';
    updatePostTitle(postId, newTitle);
});

async function deletePost(postId) {
    try {
        const response = await fetch(`${API}posts/${postId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            displayMessage(`Post with ID ${postId} successfully deleted`, 'success');
        } else {
            displayMessage(`Failed to delete post with ID ${postId}`, 'error');
        }
    } catch (error) {
        displayMessage(`Error deleting post: ${error}`, 'error');
    }
}

// Event listener for delete post button
document.getElementById('delete').addEventListener('click', function() {
    const postId = 12;
    deletePost(postId);
});

// Function to display messages in the HTML
function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    // Clear larger message container if there is anything in it
    const container = document.getElementById('postsContainer');
    container.innerHTML = ''; // Clear previous content
    // Clear messages
    messageElement.innerHTML = "";
    messageElement.textContent = message;
    messageElement.className = type; 
}