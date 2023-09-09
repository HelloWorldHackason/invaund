// Google Maps JavaScript APIの型定義をインポート
import { Loader, Map, Marker } from '@googlemaps/google-maps-services-js';

// Google Maps JavaScript API キーを設定
const googleMapsApiKey = 'YOUR_API_KEY'; // ご自身のAPIキーに置き換えてください

// 地図初期化関数
function initMap(): void {
  // マップを表示する要素を取得
  const mapElement = document.getElementById("map");

  if (mapElement) {
    // マップの初期設定
    const mapOptions: Map.InitializeParams = {
      center: { lat: -33, lng: 151 },
      zoom: 4,
    };

    // マップを作成
    const map = new Map.Loader({
      apiKey: googleMapsApiKey, // APIキーを設定
    }).load().then(() => {
      // マップを表示
      new Map(mapElement, mapOptions);

      // マーカーを作成
      const image = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        scaledSize: new google.maps.Size(50, 50), // マーカーのサイズを指定
      };

      const beachMarker = new Marker({
        position: { lat: -33.89, lng: 151.274 },
        icon: image,
        map: map,
      });
    });
  }
}

// ページが読み込まれたときにマップを初期化
window.addEventListener("load", () => {
  initMap();
});
