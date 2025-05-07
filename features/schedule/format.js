//데이터 포맷하는 함수들

//날짜 형식 포맷 2020/2/2 → 2020/02/02
function formatDate(date) {
    // "2025/4/2" → [2025, 4, 2]
    const parts = date.split('/');
    if (parts.length !== 3) return null;
  
    const [yyyy, m, d] = parts;
    const mm = m.padStart(2, '0');  // "4" → "04"
    const dd = d.padStart(2, '0');  // "2" → "02"
  
    return `${yyyy}/${mm}/${dd}`;   // "2025/04/02"
  }
  

//명령어로부터 받은 텍스트로부터 날짜 파싱하는 함수
function parseDate(text) {
    const dateRegex = /\d{4}\/\d{1,2}\/\d{1,2}/;
    const match = text.match(dateRegex);  

            if (!match) {
                return say("❗ 날짜 형식이 잘못됐어요. 예: 2025/04/02 or 2025/4/2");
            }

    return match[0]; // "2025/4/2"
  
  }

  module.exports = {
    formatDate,
    parseDate
  };