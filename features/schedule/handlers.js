const service = require('./service');
const {buildEditScheduleModal, buildTodoBlocks} = require('./blocks');
const { formatDate } = require('./format');

function register(app) {

    app.action('mark_done', async ({ body, ack, say }) => {
        await ack(); // Slack에 이벤트 수신 확인
        const scheduleId = body.actions[0].selected_options[0].value; 
        const result = await service.completeSchedule(scheduleId);
        await say(result); // 완료 메시지 전송
      });

    app.action('delete_schedule', async ({ body, ack, say }) => {
        await ack(); // Slack에 이벤트 수신 확인
        const scheduleId = body.actions[0].value; // 버튼에서 전달된 리마인더 ID 가져오기
        const result = await service.deleteSchedule(scheduleId);
        await say(result); // 완료 메시지 전송
      }
    );

    app.action('edit_schedule', async ({ ack, body, client }) => {
      await ack();
    
      const scheduleId = body.actions[0].value;
    
      // 스케줄 데이터 읽기 (service는 순수 데이터만 다루게)
      const schedule = await service.getSchedule(scheduleId);
    
      if (!schedule) {
        console.error('일정을 찾을 수 없습니다.');
        return;
      }
    
      
      const modalView = buildEditScheduleModal(body.trigger_id, scheduleId, schedule);
      // 모달은 여기서 client로 직접 띄움
      await client.views.open(modalView);

    });


    app.view('edit_schedule_submit', async ({ ack, body, view, client }) => {
      await ack();
    
      const scheduleId = view.private_metadata; // 수정할 스케줄 ID
      const title = view.state.values.title_block.title_input.value;
      let dueDate = view.state.values.date_block.date_input.value;
      dueDate = formatDate(dueDate); // "2025/4/2" → "2025/04/02"
    
      console.log(`📝 수정할 ID: ${scheduleId}`);
      console.log(`제목: ${title}, 마감일: ${dueDate}`);
    
      // service.js에서 updateSchedule(scheduleId, title, dueDate) 호출
      await service.updateSchedule(scheduleId, title, dueDate);
    
      // 수정 완료 메시지 보내기
      await client.chat.postMessage({
        channel: body.user.id,
        text: `✅ 일정이 수정되었습니다!`
      });
      const blocks = buildTodoBlocks();
      
    });
  
 
}

module.exports = { register };
