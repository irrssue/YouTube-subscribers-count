// Replace with your actual API key
const API_KEY = 'AIzaSyCGiPbtlRFORcpejuZR2JfhmmltZh-yD5E';

function submitUsername() {
  const username = document.getElementById('channel-username').value.trim().replace('@', '');

  // Get the modal and main content elements
  const modal = document.getElementById('popup-modal');
  const mainContent = document.getElementById('main-content');

  // Ensure the elements exist before applying styles
  if (modal && mainContent) {
    // Hide the popup modal and show the main content
    modal.style.display = 'none';
    mainContent.style.display = 'flex';
  } else {
    console.error('Element not found: popup-modal or main-content');
    return;
  }

  // Continue with fetching YouTube data...
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${username}&key=${API_KEY}`;

  // Fetch the channel information using the search endpoint
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the API response
      if (data.items && data.items.length > 0) {
        const channelId = data.items[0].id.channelId;

        // Fetch subscriber count using the channel ID
        const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
        return fetch(statsUrl);
      } else {
        throw new Error("Channel not found.");
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the API response
      if (data.items && data.items.length > 0) {
        const subscriberCount = data.items[0].statistics.subscriberCount;

        // Update the displayed subscriber count
        document.getElementById('subscriber-count').textContent = `Subscribers: ${subscriberCount}`;

        // Update the "View Channel" button link
        const viewChannelBtn = document.getElementById('view-channel');
        viewChannelBtn.href = `https://www.youtube.com/@${username}`;
        viewChannelBtn.textContent = `View Channel`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Channel not found. Please enter a valid YouTube username.');
    });
}
