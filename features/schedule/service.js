const db = require('../../common/database');

async function createScedule(title, dueDate, userId, scheduleId) {

    const schedule = {
        id: scheduleId,
        title,
        userId,
        createdAt: new Date(),
        dueDate,
        isCompleted: false
    }

    db.addItem('schedules.json', schedule); // JSON 데이터베이스에 저장
      return `일정이 등록되었습니다.: "${title}"`;
}

async function completeSchedule(scheduleId) {
  const schedules = db.readJson('schedules.json');
  const schedule = schedules.find(r => r.id === parseInt(scheduleId));

  if (!schedule) {
    return `일정을 찾을 수 없습니다: ID(${scheduleId})`;
  }

  schedule.isCompleted = true;
  db.updateItem('schedules.json', schedule.id, schedule); // JSON 데이터 업데이트

  return `일정이 완료되었습니다: "${schedule.title}"`;
}

async function deleteSchedule(scheduleId) {
  const schedules = db.readJson('schedules.json');
  const schedule = schedules.find(r => r.id === parseInt(scheduleId));

  if (!schedule) {
    return `일정을 찾을 수 없습니다: ID(${scheduleId})`;
  }

  db.deleteItem('schedules.json', schedule.id); // JSON 데이터 삭제

  return `일정이 삭제되었습니다: "${schedule.title}"`;
}

async function getSchedule(scheduleId) {
  const schedules = db.readJson('schedules.json');
  const schedule = schedules.find(r => r.id === parseInt(scheduleId));

  if (!schedule) {
    console.error('일정이 없습니다.');
    return;
  }

  return schedule;
}

async function updateSchedule(scheduleId, title, dueDate) {
  const schedules = db.readJson('schedules.json');
  const schedule = schedules.find(r => r.id === parseInt(scheduleId));

  if (!schedule) {
    return `일정을 찾을 수 없습니다: ID(${scheduleId})`;
  }

  schedule.title = title;
  schedule.dueDate = dueDate;
  db.updateItem('schedules.json', schedule.id, schedule); // JSON 데이터 업데이트

  return `일정이 수정되었습니다: "${schedule.title}"`;


}





module.exports = {
    createScedule,
    completeSchedule,
    deleteSchedule,
    updateSchedule,
    getSchedule
  };