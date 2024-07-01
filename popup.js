document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    fetchShortforms().then(shortforms => {
      searchYouTube(query, shortforms);
    });
  });
  
  function fetchShortforms() {
    const url = 'https://www.stands4.com/'; // Replace with actual URL
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const shortforms = {};
        data.forEach(item => {
          shortforms[item.shortform] = item.fullform;
        });
        return shortforms;
      })
      .catch(error => {
        console.error('Error fetching shortforms:', error);
        return {};
      });
  }
  
  function searchYouTube(query, shortforms) {
    const apiKey = 'AIzaSyAxpbQHnBpfyIfoQscxEdOfVZ0OjFeGZa0';
  
    // Expand abbreviations
    query = shortforms[query] || query;
  
    // Placeholder for the channel ID
    const channelId = 'UC8butISFwT-Wl7EV0hUK0BQ'; // Replace with dynamic retrieval
  
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&q=${query}`)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        data.items.forEach(item => {
          const videoTitle = item.snippet.title;
          const videoId = item.id.videoId;
          resultsDiv.innerHTML += `<p><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoTitle}</a></p>`;
        });
      })
      .catch(error => console.error('Error:', error));
  }
  