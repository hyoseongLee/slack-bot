const { GoogleGenerativeAI } = require('@google/generative-ai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function getZodiacSign(month, day) {
  const signs = [
    { name: '물병자리', from: [1, 20], to: [2, 18] },
    { name: '물고기자리', from: [2, 19], to: [3, 20] },
    { name: '양자리', from: [3, 21], to: [4, 19] },
    { name: '황소자리', from: [4, 20], to: [5, 20] },
    { name: '쌍둥이자리', from: [5, 21], to: [6, 21] },
    { name: '게자리', from: [6, 22], to: [7, 22] },
    { name: '사자자리', from: [7, 23], to: [8, 22] },
    { name: '처녀자리', from: [8, 23], to: [9, 22] },
    { name: '천칭자리', from: [9, 23], to: [10, 23] },
    { name: '전갈자리', from: [10, 24], to: [11, 22] },
    { name: '사수자리', from: [11, 23], to: [12, 24] },
    { name: '염소자리', from: [12, 25], to: [1, 19] }
  ];

  for (const sign of signs) {
    const [fromM, fromD] = sign.from;
    const [toM, toD] = sign.to;
    if (
      (month === fromM && day >= fromD) ||
      (month === toM && day <= toD)
    ) {
      return sign.name;
    }
  }
  return '알 수 없음';
}

async function getConstellationFortune(birthday) {
  const year = birthday.slice(0, 4);
  const month = parseInt(birthday.slice(4, 6), 10);
  const day = parseInt(birthday.slice(6, 8), 10);
  const sign = getZodiacSign(month, day);

  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
  const result = await model.generateContent(
    `${sign}의 오늘 운세를 3줄로, 밝고 긍정적으로 알려줘.`
  );
  const response = await result.response;
  const fortune = response.text();

  return {
    sign,
    fortune
  };
}

module.exports = {
  getConstellationFortune
};
