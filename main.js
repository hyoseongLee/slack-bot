require("dotenv").config();
const { App } = require("@slack/bolt");
const {
  // createQuestionService,
  // evaluateQuestionService,
  studyService,
  submitAnswerService,
} = require("./features/study/study-service.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

// hello 라는 메세지가 오는 것을 감지하는 부분입니다.
app.message("hello", async ({ message, say }) => {
  // say() 는 block 이라고 하는 슬랙 메세지 형태의 일종을 보내는 함수입니다. blocks 를 설정해서 보내면 됩니다.
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

app.command("/study", studyService);

app.action("submit_answer_button", submitAnswerService);

// app.command("/질문생성", createQuestionService);
// app.command("/질문답변", evaluateQuestionService);

(async () => {
  await app.start();
  console.log("⚡️ Slack 봇이 실행 중입니다!");
})();
