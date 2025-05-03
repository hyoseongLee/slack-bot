const db = require('../../common/database');


function buildTodoBlocks() {
  const schedules = db.readJson('schedules.json');
  
  const blocks = [];

  schedules
    .filter(schedule => !schedule.isCompleted) // 완료 안 된 일정만
    .forEach(schedule => {
      const id = schedule.id.toString(); // ID를 문자열로 변환
      blocks.push(
        {
          type: 'section',
          block_id: id, // 블록마다 고유 ID
          text: {
            type: 'mrkdwn',
            text: `*${schedule.title}*  \n📅 ${schedule.dueDate}`
          },
          accessory: {
            type: 'checkboxes',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: '완료',
                  emoji: true
                },
                value: id // 체크하면 이 id를 받을 수 있음
              }
            ],
            action_id: 'mark_done'
          }
        },
        {
          type: 'actions',
          block_id: `${id}_actions`,
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '수정 ✏️',
                emoji: true
              },
              value: id,
              action_id: 'edit_schedule'
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '삭제 🗑️',
                emoji: true
              },
              style: 'danger',
              value: id,
              action_id: 'delete_schedule'
            }
          ]
        },
        { type: 'divider' }
      );
    });

    

  return blocks;
}


function buildEditScheduleModal(trigger_id, scheduleId, schedule) {
    return {
      trigger_id: trigger_id,
      view: {
        type: 'modal',
        callback_id: 'edit_schedule_submit',
        private_metadata: scheduleId,
        title: {
          type: 'plain_text',
          text: '일정 수정'
        },
        submit: {
          type: 'plain_text',
          text: '수정하기'
        },
        close: {
          type: 'plain_text',
          text: '취소'
        },
        blocks: [
          {
            type: 'input',
            block_id: 'title_block',
            label: { type: 'plain_text', text: '제목' },
            element: {
              type: 'plain_text_input',
              action_id: 'title_input',
              initial_value: schedule.title
            }
          },
          {
            type: 'input',
            block_id: 'date_block',
            label: { type: 'plain_text', text: '마감일' },
            element: {
              type: 'plain_text_input',
              action_id: 'date_input',
              initial_value: schedule.dueDate
            }
          }
        ]
      }
    };
  }
  


module.exports = { buildEditScheduleModal, buildTodoBlocks };