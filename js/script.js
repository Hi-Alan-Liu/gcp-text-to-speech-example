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
    const languageCode = $('#language-select').val();
    const voiceName = $('#voice-select').val();

    // 請求參數
    const requestData = {
      "input": {
        "text": textToSynthesize
      },
      "voice": {
        "languageCode": languageCode,
        "name": voiceName
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

  $('#language-select').change(function() {
    $('#voice-select').empty(); // 清除原有的選項
    $('#voice-select').append('<option value="" selected disabled hidden>請選擇聲音</option>'); // 新增預設選項
  
    const languageCode = $(this).val();
    let voiceOptions = "";
  
    if (languageCode === "zh-TW") {
      voiceOptions += `
        <option value="cmn-TW-Standard-A" selected>cmn-TW-Standard-A (女)</option>
        <option value="cmn-TW-Standard-B">cmn-TW-Standard-B (男)</option>
        <option value="cmn-TW-Standard-C">cmn-TW-Standard-C (男)</option>
        <option value="cmn-TW-Wavenet-A">cmn-TW-Wavenet-A (女)</option>
        <option value="cmn-TW-Wavenet-B">cmn-TW-Wavenet-B (男)</option>
        <option value="cmn-TW-Wavenet-C">cmn-TW-Wavenet-C (男)</option>
      `;
    } else if (languageCode === "en-US") {
      voiceOptions += `
        <option value="en-US-Wavenet-A" selected>en-US-Wavenet-A (男)</option>
        <option value="en-US-Wavenet-B">en-US-Wavenet-B (男)</option>
        <option value="en-US-Wavenet-C">en-US-Wavenet-C (女)</option>
        <option value="en-US-Wavenet-D">en-US-Wavenet-D (男)</option>
        <option value="en-US-Wavenet-E">en-US-Wavenet-E (女)</option>
        <option value="en-US-Wavenet-F">en-US-Wavenet-F (女)</option>
        <option value="en-US-Wavenet-G">en-US-Wavenet-G (女)</option>
        <option value="en-US-Wavenet-H">en-US-Wavenet-H (女)</option>
        <option value="en-US-Wavenet-I">en-US-Wavenet-I (男)</option>
        <option value="en-US-Wavenet-J">en-US-Wavenet-J (男)</option>
      `;
    }
  
    $('#voice-select').append(voiceOptions);
  });
});