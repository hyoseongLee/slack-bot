const { GoogleGenerativeAI } = require('@google/generative-ai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Google Generative AI 초기화
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 생년으로 띠 구하는 함수
const getZodiacAnimal = (year) => {
  const animals = [
    '원숭이', '닭', '개', '돼지', '쥐', '소', 
    '호랑이', '토끼', '용', '뱀', '말', '양'
  ];
  return animals[year % 12];
};

// 띠 운세 생성
const getZodiacFortune = async (year) => {
  const animal = getZodiacAnimal(year);

  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const result = await model.generateContent(
    `당신은 띠(12간지) 운세를 알려주는 점성술사입니다. ${animal}띠에 대한 오늘의 운세를 3줄로 써줘.`
  );

  const response = await result.response;
  const fortune = response.text();

  return {
    animal,
    fortune
  };
};

// 띠별 이미지 URL
const getZodiacImageUrl = async (animal) => {
  const basicImageMap = {
    '쥐': 'https://cdn.pixabay.com/photo/2024/02/04/09/23/ai-generated-8551808_1280.jpg',
    '소': 'https://cdn.pixabay.com/photo/2014/04/02/10/51/cow-304765_1280.png',
    '호랑이': 'https://cdn.pixabay.com/photo/2023/07/23/11/49/ai-generated-8144993_1280.png',
    '토끼': 'https://cdn.pixabay.com/photo/2020/02/24/11/01/bunny-4875877_1280.png',
    '용': 'https://cdn.pixabay.com/photo/2022/03/12/07/29/dragon-7063554_1280.png',
    '뱀': 'https://cdn.pixabay.com/photo/2024/12/31/23/30/snake-9302954_1280.png',
    '말': 'https://cdn.pixabay.com/photo/2017/06/10/12/44/man-and-horses-2389833_1280.png',
    '양': 'https://cdn.pixabay.com/photo/2023/06/28/06/10/sheep-8093556_1280.png',
    '원숭이': 'https://cdn.pixabay.com/photo/2023/02/02/02/52/monkey-7761732_1280.png',
    '닭': 'https://cdn.pixabay.com/photo/2017/07/20/03/52/chicken-2521141_1280.png',
    '개': 'https://cdn.pixabay.com/photo/2020/11/20/17/18/dog-5762267_1280.png',
    '돼지': 'https://cdn.pixabay.com/photo/2016/03/31/23/42/animal-1297789_1280.png'
  };

  return basicImageMap[animal] || 'https://example.com/default.png';
};

module.exports = {
  getZodiacFortune,
  getZodiacImageUrl
};
