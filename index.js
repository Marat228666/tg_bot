const TelegramApi=require('node-telegram-bot-api')

const token='6516523486:AAG9Dx9JIG-2HEKLXXU6AqX5ZOQoTVjmR0I'

const bot=new TelegramApi(token, {polling: true})

const chats={}

let attempts=null;

const {gameOptions, againOptions}=require('./options')

const startGame= async(chatId)=>{
    await bot.sendMessage(chatId, 'Разгадай рандомную цифру от 1 до 10')
    const randomNumber= Math.floor(Math.random()*10)
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId, 'отгадывай', gameOptions);
    attempts=0;
}

const start=()=>{
    bot.setMyCommands([
        {command:'/start', description:'Приветсвие'},
        {command:'/info', description:'О себе'},
        {command:'/game', description:'Игра отгодай число'},
    ])

    bot.on('message', async msg=>{
        const text=msg.text;
        const chatId=msg.chat.id;
        console.log(msg)
        if(text==='/start'){
            await bot.sendMessage(chatId, "Это телеграм бот Марата")
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            if(msg.from.first_name==='Vadim'){
                await bot.sendMessage(chatId, 'Папа привет')
            }
            if(msg.from.username!=='sage_mainer' && msg.from.username!=='H0lala' && msg.from.username!=='Tihonyxxxx' && msg.from.first_name!=='Vadim'){
                await bot.sendMessage(chatId, 'Ты кто????????????????????????????????')
            }
           
        }
        else if(text==='/info'){
            await bot.sendMessage(chatId, 'Тебя зовут: '+msg.from.first_name+' '+msg.from.last_name)
        }
        else if(text==='/game'){
            return startGame(chatId)
        }
        else{
            await bot.sendMessage(chatId, 'Это не какаята команда так что привет')
        }



        /*if(msg.from.username==='sage_mainer'){
            await bot.sendMessage(chatId, 'Сам себе пишешь?')
        }*/
        if(msg.from.username==='Tihonyxxxx'){
            await bot.sendMessage(chatId, 'Тихон лох кста')
        }
        if(msg.from.username==='H0lala'){
            await bot.sendMessage(chatId, 'Эй Ваня, ты лох')
        }
        if(msg.from.first_name==='Наталья'&& msg.from.last_name==='Коваленко'){
            await bot.sendMessage(chatId, 'Мама привет')
        }
        
        
        /*bot.sendMessage(chatId, 'Кто бы ты ни был ты написал '+text)*/
    })

    bot.on('callback_query',  async msg=>{
        const data=msg.data;
        const chatId=msg.message.chat.id;
        
        if(data==='/again'){
            return startGame(chatId)
        }
        if(attempts<3){
            if(data==chats[chatId]){
                attempts=3;
                return bot.sendMessage(chatId, 'Угадал!!!!', againOptions)
            }
            else{
                if(attempts==2){
                    attempts=3;
                    return bot.sendMessage(chatId, 'В другой раз, бот загадал '+ chats[chatId], againOptions)
                }
                else{
                    attempts++;
                    return bot.sendMessage(chatId, 'Не угадал, осталось '+(3-attempts)+' попыток');
                    
                }
            }
        }
        else{
            return bot.sendMessage(chatId, 'Бот загадал '+ chats[chatId], againOptions)
        }

        
        
        
    })
}

start();

/*npm run dev*/