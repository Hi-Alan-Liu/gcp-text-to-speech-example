$(document).ready(function() {
  $('#submit-btn').click(function() {
    // Google Cloud Text-to-Speech API 的網址
    const apiUrl = "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyDlBrx9262AGv_FPeHPIfy5CCOzwRoTT0E";

    // 讀取要合成的文字
    const textToSynthesize = $('#speak-text').val();

    // 檢查是否為空
    if (!textToSynthesize.trim()) {
      alert("請輸入要說的話");
      return;
    }

    // 讀取選擇的性別
    const ssmlGender = $('#gender-select').val();
    const languageCode = $('#language-select').val();

    // 請求參數
    const requestData = {
      "input": {
        "text": textToSynthesize
      },
      "voice": {
        "languageCode": languageCode,
        "ssmlGender": ssmlGender
      },
      "audioConfig": {
        "audioEncoding": "MP3"
      }
    };

    // 發送 AJAX 請求
    $.ajax({
      url: apiUrl,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function(data) {
        // 取得合成後的音訊連結
        const audioUrl = "data:audio/mp3;base64," + data.audioContent;

        // 在瀏覽器中播放聲音
        const audio = new Audio(audioUrl);
        audio.play();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("發生錯誤:", errorThrown);
      }
    });
  });
});