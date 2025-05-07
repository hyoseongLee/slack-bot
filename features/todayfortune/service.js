const { GoogleGenerativeAI } = require('@google/generative-ai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getTodayFortune(birthday) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const prompt = `당신은 점성술사입니다. 사용자의 생년월일은 ${birthday}입니다. 오늘 하루의 운세를 기분 좋게 3줄로 요약해서 알려주세요.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const fortune = response.text();

  return { fortune };
}

module.exports = {
  getTodayFortune
};
