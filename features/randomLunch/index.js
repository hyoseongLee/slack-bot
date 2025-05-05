//점심 메뉴 추천 커맨드 구성
function init(app) {
    app.command('/lunch',async ({command,ack,say})=> {
        await ack();
        const menu = service.pickRandomLunchMenu();
        await say(`오늘의 점심 추천 메뉴는 *${menu}*입니다!`);
    })
}

module.exports = {init};