import time
import asyncio
import logging

from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
from aiogram.utils.chat_action import ChatActionSender

from Db import DataBase
from config import TG_BOT_TOKEN


bot = Bot(token=TG_BOT_TOKEN)
db = DataBase()
# db.db__clear()
db.init()
dp = Dispatcher()
logging.basicConfig(level = logging.INFO)


@dp.message(Command('ref'))
async def cmd_ref(message: types.Message):
    async with ChatActionSender.typing(bot = bot, chat_id = message.from_user.id):
        text = (f'🚀 Вот твоя персональная ссылка на приглашение: '
                f'https://t.me/testmmn_bot?start={message.from_user.id}_{message.from_user.username}')
    await message.answer(text)

@dp.message(Command('start'))
async def process_start_command(message: types.Message, bot: Bot):
    db.connection__open()
    tg_id = message.from_user.id
    user = db.user__get(tg_id)

    if (not user):
        tg_premium = 0

        if (message.from_user.is_premium):
            tg_premium = 1

        db.user__add(tg_id, tg_premium)
        await message.answer(f'Вы зарегестрировались')
    elif (len(message.text.split()) == 1):
        await message.answer(f'Вы уже авторизованы')

    if (len(message.text.split()) != 2):
        db.connection__cose()

        return

    host_tg_id = message.text.split()[-1].split('_')[0]
    host_tg_username = message.text.split()[-1].split('_')[1]

    if (int(host_tg_id) != int(tg_id) and not user):
        invitation_date = time.time()
        payment = 50

        if (message.from_user.is_premium):
            payment = 200

        db.referral__add(host_tg_id, payment, invitation_date, tg_id)
        await message.answer(f'Вас добавил пользователь @{host_tg_username}')
    elif (int(host_tg_id) == int(tg_id)):
        await message.answer(f'Нельзя добавить самого себя')
    elif (user):
        await message.answer(f'Вас уже добавил пользователь')

    db.connection__cose()

@dp.message(Command('start'))
async def cmd_start(message: types.Message):
    await message.answer('Привет! Я бот!')

@dp.message(Command('help'))
async def cmd_help(message: types.Message):
    await message.answer('Можешь воспользоваться мини приложением, нажав на кнопку')

@dp.message(F.text)
async def echo_with_time(message: types.Message):
    await message.answer('Не понял тебя... \nНапиши /help чтобы узнать мои возможности')


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
