require("dotenv").config();
const { questionStore } = require("./question-store.js");
const OpenAI = require("openai");

const callOpenAi = async (answer) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { category, question } = questionStore.get();
    const prompt = `
    당신은 면접관입니다. 
    ${category} 카테고리의 질문 ${question}이 주어집니다.
    이에 대한 지원자의 답변은 다음과 같습니다. ${answer}
    이 답변인지 질문에 대한 옳은 평가인지 평가해 주세요.
    만약 부족한 부분이 있다면 어떤 부분이 부족한지 구체적으로 설명해 주세요.
    또한 잘한 부분이 있다면 어떠 부분을 잘했는지 구체적으로 설명해 주세요.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
};

module.exports = { callOpenAi };
