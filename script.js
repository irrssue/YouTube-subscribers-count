// Replace with your actual API key
const API_KEY = 'AIzaSyCGiPbtlRFORcpejuZR2JfhmmltZh-yD5E';

function getSubscriberInfo() {
  const username = document.getElementById('channel-username').value.trim().replace('@', '');

  // YouTube API URL to search for the channel by username (handle)
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${username}&key=${API_KEY}`;

  // First, fetch the channel information using the search endpoint
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const channelId = data.items[0].id.channelId;

        // Now that we have the channel ID, fetch the subscriber count
        const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

        // Fetch the subscriber count using the channel ID
        return fetch(statsUrl);
      } else {
        throw new Error("Channel not found.");
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const subscriberCount = data.items[0].statistics.subscriberCount;

        // Update the displayed subscriber count
        document.getElementById('subscriber-count').textContent = `Subscribers: ${subscriberCount}`;

        // Update the "View Channel" button link
        const viewChannelBtn = document.getElementById('view-channel');
        viewChannelBtn.href = `https://www.youtube.com/@${username}`;
        viewChannelBtn.textContent = `View @${username}'s Channel`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Channel not found. Please enter a valid YouTube username.');
    });
}
