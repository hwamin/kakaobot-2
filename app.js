var restify = require('restify');
var botbuilder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s',server.name,server.url);
});

var connector = new botbuilder.ChatConnector({
    appId: '56fea224-774d-4160-b3c5-f22420e4645c',
    appPassword: 'ZZrTLzB0L6kOvjk8zHgjqOE'
});

server.post('/api/messages',connector.listen());

var bot = new botbuilder.UniversalBot(connector,function(session){
    session.send('죄송해요. 무슨 말인지 알 수가 없네요.');
});

var recognizer = new botbuilder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/331ffeee-d406-4b02-9bea-766f74d0633a?subscription-key=e01fd9e5bd9946b6b22f59c62de8f6c5&verbose=true&timezoneOffset=0&q=');
bot.recognizer(recognizer);

bot.dialog('소개요청',[
    function(session, args, next){
        session.send('제 이름은 NUB-i Bot이에요. 시험테스트 계정입니다.');
    }
]).triggerAction({
    matches: '소개요청'
});

bot.dialog('인사',[
    function(session, args, next){
        session.send('안녕하세요? 좋은 하루 보내세요.');
    }
]).triggerAction({
    matches: '인사'
});