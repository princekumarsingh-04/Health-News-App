const apiKey = '7e4f288d25684e67b3c7010fcb0db393';  // Replace with your actual API key
const apiUrl = 'https://newsapi.org/v2/everything?apiKey=' + apiKey + '&q=';

const newsContainer = document.getElementById('news-container');

document.getElementById('all-news').addEventListener('click', () => fetchNews('health'));
document.getElementById('nutrition-news').addEventListener('click', () => fetchNews('nutrition'));
document.getElementById('fitness-news').addEventListener('click', () => fetchNews('fitness'));
document.getElementById('mental-health-news').addEventListener('click', () => fetchNews('mental health'));

function fetchNews(query) {
    fetch(apiUrl + query)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
        });
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No articles found.</p>';
    } else {
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;

            newsContainer.appendChild(articleElement);
        });
    }
}

// Load default news on page load
fetchNews('health');
