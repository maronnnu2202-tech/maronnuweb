// ✅ あなたのAPIキーとチャンネルIDをここに入力してください
const API_KEY = 'AIzaSyConlnuRZRn1wnUIRP_genVuGTZGZUACWc'; // 例: AIzaSyDxxxxxxx
const CHANNEL_ID = 'UCD4nD3D0BGxW8UAR9qD59MQ'; // 例: UC_x5XG1OV2P6uZZ5FSM9Ttw

// 🔁 登録者数を取得して表示する関数
function fetchSubscriberCount() {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }
      return response.json();
    })
    .then(data => {
      const count = data.items[0].statistics.subscriberCount;
      document.getElementById('subscriber-count').textContent = `${count}人`;
    })
    .catch(error => {
      console.error('登録者数の取得に失敗しました:', error);
      document.getElementById('subscriber-count').textContent = '取得失敗';
    });
}

// 🔄 定期的に更新（例：30秒ごと）
fetchSubscriberCount(); // 初回実行
setInterval(fetchSubscriberCount, 3600000); // 1時間ごとに更新
