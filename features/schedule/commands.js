const service = require('./service');
const {buildEditScheduleModal, buildTodoBlocks} = require('./blocks');
const { formatDate, parseDate } = require('./format');



function register(app) {
    
  
    // /addschedule
    app.command('/addschedule', async ({ command, ack, say }) => {
      await ack();
      
          const scheduleId = Date.now(); // 고유 ID 생성
          
          const text = command.text // "일정 날짜"

          let dueDate = parseDate(text) // "2025/4/2"
          const title = text.replace(dueDate, '').trim(); //일정제목 추출
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