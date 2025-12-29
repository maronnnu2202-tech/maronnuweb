document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'AIzaSyB3X9nYiE5XqxCS7VjX6y51K1sW6f559YM'; // ← あなたのAPIキー
  const CHANNEL_ID = 'UCY9YJEfhZrkU-AYXtQqiRCg'; // ← まろんぬ実写チャンネルのチャンネルID

  const videoContainer = document.getElementById('latest-video');

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${API_KEY}`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      videoContainer.innerHTML = ''; // 初期表示をクリア

      // APIエラー時の処理
      if (data.error) {
        videoContainer.textContent = 'APIエラー: ' + (data.error.message || '不明なエラー');
        return;
      }

      if (!data.items || data.items.length === 0) {
        videoContainer.textContent = '動画が見つかりませんでした。';
        return;
      }

      data.items.forEach(video => {
        const title = video.snippet?.title || 'タイトルなし';
        // video.id.videoId か video.id のどちらかで取得
        const videoId = video.id?.videoId || (typeof video.id === 'string' ? video.id : null);
        const thumbnail = video.snippet?.thumbnails?.high?.url;
        if (!videoId || !thumbnail) return; // 不正なデータはスキップ

        const link = `https://www.youtube.com/watch?v=${videoId}`;

        const videoHTML = `
          <div style="margin-bottom: 20px;">
            <a href="${link}" target="_blank" style="text-decoration: none; color: inherit;">
              <img src="${thumbnail}" alt="${title}" style="width: 100%; max-width: 480px; border-radius: 8px;">
              <h3 style="margin-top: 10px;">${title}</h3>
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
