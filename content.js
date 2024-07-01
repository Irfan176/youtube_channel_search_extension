(function() {
    // Check if we're on a YouTube channel page
    if (window.location.href.match(/youtube.com\/(c|channel|user)\//)) {
      // Create and style the search bar
      const searchBar = document.createElement('input');
      searchBar.type = 'text';
      searchBar.id = 'channelSearchBar';
      searchBar.placeholder = 'Search channel...';
      
      const searchButton = document.createElement('button');
      searchButton.innerText = 'Search';
      searchButton.id = 'channelSearchButton';
  
      // Append search bar and button to the page
      const parentDiv = document.querySelector('#channel-header-container') || document.querySelector('#primary');
      if (parentDiv) {
        parentDiv.prepend(searchButton);
        parentDiv.prepend(searchBar);
      }
  
      searchButton.addEventListener('click', () => {
        const query = searchBar.value;
        const channelId = window.location.href.match(/(c|channel|user)\/([^\/]+)/)[2];
        fetchShortforms(query).then(expandedQuery => {
          searchYouTube(expandedQuery, channelId);
        });
      });
    }
  })();
  
  function fetchShortforms(query) {
    const url = `https://www.stands4.com/services/v2/abbr.php?uid=12649&tokenid=21VxyIe7X5MlFhSQ&term=${query}&format=json`; // Replace with your UID and Token ID
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.result && data.result.length > 0) {
          // Assume the first result is the most relevant
          return data.result[0].definition;
        } else {
          // If no abbreviation is found, return the original query
          return query;
        }
      })
      .catch(error => {
        console.error('Error fetching shortforms:', error);
        return query;
      });
  }
  
  function searchYouTube(query, channelId) {
    const apiKey = 'AIzaSyAxpbQHnBpfyIfoQscxEdOfVZ0OjFeGZa0';
  
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&q=${query}`)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('results') || document.createElement('div');
        resultsDiv.id = 'results';
        resultsDiv.innerHTML = '';
  
        data.items.forEach(item => {
          const videoTitle = item.snippet.title;
          const videoId = item.id.videoId;
          resultsDiv.innerHTML += `<p><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoTitle}</a></p>`;
        });
  
        document.body.appendChild(resultsDiv);
      })
      .catch(error => console.error('Error:', error));
  }
  