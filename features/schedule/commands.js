const service = require('./service');
const {buildEditScheduleModal, buildTodoBlocks} = require('./blocks');


function formatDate(input) {
  // "2025/4/2" → [2025, 4, 2]
  const parts = input.split('/');
  if (parts.length !== 3) return null;

  const [yyyy, m, d] = parts;
  const mm = m.padStart(2, '0');  // "4" → "04"
  const dd = d.padStart(2, '0');  // "2" → "02"

  return `${yyyy}/${mm}/${dd}`;   // "2025/04/02"
}

function register(app) {
    
  
    // /addschedule
    app.command('/addschedule', async ({ command, ack, say }) => {
      await ack();
      // ... 일정 추가 로직
          const scheduleId = Date.now(); // 고유 ID 생성
          
          const text = command.text

          const dateRegex = /\d{4}\/\d{1,2}\/\d{1,2}/;
          const match = text.match(dateRegex);  

          if (!match) {
            return say("❗ 날짜 형식이 잘못됐어요. 예: 2025/04/02 or 2025/4/2");
          }

          let dueDate = match[0]; // "2025/4/2"
          const title = text.replace(dueDate, '').trim();
          dueDate = formatDate(dueDate); // "2025/4/2" → "2025/04/02"

          
          const result = await service.createScedule(title, dueDate, command.user_id, scheduleId);

          await say(`title: ${title} dueDate : ${dueDate}`);
          console.log(`title: ${title} dueDate : ${dueDate}`);

          const id = scheduleId.toString(); // ID를 문자열로 변환

          const todoBlocks = buildTodoBlocks();

          await say({
            todoBlocks
          });




          
    });
  
    // /showSchedule
    app.command('/showschedules', async ({ command, ack, say }) => {
      await ack();
      // ... 전체 일정 보여주는 로직
      const blocks = buildTodoBlocks();

          await say({
            blocks
          });
    });
  
    // /deleteschedule
    app.command('/deleteSchedule', async ({ command, ack, say }) => {
      await ack();
      // ... 일정 삭제 처리
    });
  
    
  }
  
  module.exports = { register };