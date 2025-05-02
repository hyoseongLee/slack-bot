require("dotenv").config();
const { App } = require("@slack/bolt");
const {
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

app.command("/study", studyService);

app.action("submit_answer_button", submitAnswerService);

(async () => {
  await app.start();
  console.log("⚡️ Slack 봇이 실행 중입니다!");
})();
