require('dotenv').config();
const { App } = require('@slack/bolt');

const randomLunch = require('./features/randomLunch')
const vote = require('./features/vote')
const weatherFeature = require('./features/weather');
const scheduleFeature = require('./features/schedule');
const algoBotFeature = require('./features/algoBot');
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

// Algobot 알고리즘 문제 추천 기능
algoBotFeature.init(app);

// 일정관리 기능
scheduleFeature.init(app);

// 면접 예상 질문 및 답변 기능
app.command("/study", studyService);
app.action("submit_answer_button", submitAnswerService);

// 오늘 날씨 조회 기능
weatherFeature.init(app);

// 점심 메뉴 추천 기능
randomLunch.init(app);

// 투표 기능
vote.init(app);

(async () => {
  await app.start();
  console.log("⚡️ Slack 봇이 실행 중입니다!");
})();
