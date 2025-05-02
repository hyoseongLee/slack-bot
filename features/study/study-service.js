const { getRandomQuestion } = require("./questions.js");
const { questionStore } = require("./question-store.js");
const { callOpenAi } = require("./openai-service.js");

const studyBlock = () => {
  const { category, question } = questionStore.get();
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*질문*\n\n카테고리: ${category}\n${question}`,
      },
    },
    {
      type: "divider",
    },
    {
      type: "input",
      block_id: "answer_input_block",
      element: {
        type: "plain_text_input",
        action_id: "user_answer",
      },
      label: {
        type: "plain_text",
        text: "답변",
        emoji: false,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "\t",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "답변 제출",
          emoji: true,
        },
        value: "click_me_123",
        action_id: "submit_answer_button",
      },
    },
  ];
};

const questionAnswerBlock = (answer) => {
  const { category, question } = questionStore.get();
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*질문*\n\n카테고리: ${category}\n${question}`,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*답변*\n\n${answer}`,
      },
    },
  ];
};

const evalutaeBlock = (evaluation) => {
  return [
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*평가*\n\n${evaluation}`,
      },
    },
  ];
};

const studyService = async ({ ack, say }) => {
  await ack();

  const { category, question } = getRandomQuestion();
  questionStore.set(category, question);

  await say({
    blocks: studyBlock(),
    text: `질문이 생성되었습니다`,
  });
};

const submitAnswerService = async ({ body, ack, say, client }) => {
  await ack();

  // 사용자가 입력한 답변
  const answer = body.state.values["answer_input_block"]["user_answer"].value;

  // 질문 및 답변 폼 업데이트
  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    blocks: questionAnswerBlock(answer),
    text: "질문 및 답변",
  });

  // GPT로 답변 평가 요청
  const evaluate = await callOpenAi(answer);
  if (!evaluate) {
    await say("답변을 평가하는 데 실패했습니다.");
  } else {
    await say({
      blocks: evalutaeBlock(evaluate),
      text: `답변 평가`,
    });
  }
};

// 폐기
const questionBlock = (category, question) => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*질문*\n\n카테고리: ${category}\n${question}`,
      },
    },
  ];
};

const createQuestionService = async ({ ack, body, client }) => {
  await ack();

  const { category, question } = getRandomQuestion();
  questionStore.set(category, question);

  await client.chat.postMessage({
    channel: body.user.id,
    text: `질문이 생성되었습니다!`,
    blocks: questionBlock(category, question),
  });
};

const evaluateQuestionService = async ({ ack, say }) => {
  await ack();

  const { category, question } = questionStore.get();
  if (!category || !question) {
    await say(
      '질문이 생성되지 않았습니다. "/질문생성" 명령어로 질문을 생성해주세요.'
    );
    return;
  }

  await say(`답변 중...`);
};

module.exports = {
  studyService,
  submitAnswerService,
  createQuestionService,
  evaluateQuestionService,
};
