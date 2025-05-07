<<<<<<< HEAD
const db = require('../../common/database');
=======
const db = require("../../common/database");
>>>>>>> upstream/main

async function createReminder(text, userId, reminderId) {
  const reminder = {
    id: reminderId,
    text,
    userId,
    createdAt: new Date(),
<<<<<<< HEAD
    isCompleted: false
  };

  db.addItem('reminders.json', reminder); // JSON 데이터베이스에 저장
=======
    isCompleted: false,
  };

  db.addItem("reminders.json", reminder); // JSON 데이터베이스에 저장
>>>>>>> upstream/main
  return `리마인더가 생성되었습니다: "${text}"`;
}

async function completeReminder(reminderId) {
<<<<<<< HEAD
  const reminders = db.readJson('reminders.json');
  const reminder = reminders.find(r => r.id === parseInt(reminderId));
=======
  const reminders = db.readJson("reminders.json");
  const reminder = reminders.find((r) => r.id === parseInt(reminderId));
>>>>>>> upstream/main

  if (!reminder) {
    return `리마인더를 찾을 수 없습니다: ID(${reminderId})`;
  }

  reminder.isCompleted = true;
<<<<<<< HEAD
  db.updateItem('reminders.json', reminder.id, reminder); // JSON 데이터 업데이트
=======
  db.updateItem("reminders.json", reminder.id, reminder); // JSON 데이터 업데이트
>>>>>>> upstream/main

  return `리마인더가 완료되었습니다: "${reminder.text}"`;
}

module.exports = {
  createReminder,
<<<<<<< HEAD
  completeReminder
=======
  completeReminder,
>>>>>>> upstream/main
};
