document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'AIzaSyARqR1M4QrigwJIq6u4VJTEpBy4qgTWgpU'; // ← あなたのAPIキー
  const CHANNEL_ID = 'UCIwgDR9ltL352XMZVcRn5rg'; // ← まろんぬLabのチャンネルID

  const videoContainer = document.getElementById('latest-video');

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&type=video&key=${API_KEY}`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      videoContainer.innerHTML = ''; // 初期表示をクリア

      if (!data.items || data.items.length === 0) {
        videoContainer.textContent = '動画が見つかりませんでした。';
        return;
      }

      data.items.forEach(video => {
        const title = video.snippet?.title || 'タイトルなし';
        const videoId = video.id?.videoId;
        const thumbnail = video.snippet?.thumbnails?.high?.url;
        if (!videoId || !thumbnail) return; // 不正なデータはスキップ

        const link = `https://www.youtube.com/watch?v=${videoId}`;

        const videoHTML = `
          <div class="video-item">
            <a href="${link}" target="_blank" style="text-decoration: none; color: inherit;">
              <img src="${thumbnail}" alt="${title}">
              <div class="video-title">${title}</div>
            </a>
          </div>
        `;
        videoContainer.innerHTML += videoHTML;
      });
    })
    .catch(error => {
      console.error('動画取得エラー:', error);
      videoContainer.textContent = '動画の取得に失敗しました。';
    });
});