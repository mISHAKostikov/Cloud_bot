import asyncio
import logging
from datetime import datetime

from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
from aiogram.utils.chat_action import ChatActionSender

from config import TG_BOT_TOKEN
from db import DataBase

# Включаем логирование, чтобы не пропустить важные сообщения
logging.basicConfig(level=logging.INFO)
# Объект бота
bot = Bot(token=TG_BOT_TOKEN)
# Диспетчер
dp = Dispatcher()
# Подключение к базе данных
db = DataBase()
db.clear_db()


# Хэндлер на команду /start
@dp.message(Command("ref"))
async def cmd_start(message: types.Message):
    async with ChatActionSender.typing(bot=bot, chat_id=message.from_user.id):
        text = (f'🚀 Вот твоя персональная ссылка на приглашение: '
                f'https://t.me/testmmn_bot?start={message.from_user.id}_{message.from_user.username}')
    await message.answer(text)


@dp.message(Command('start'))
async def process_start_command(message: types.Message, bot: Bot):
    tg_id = message.from_user.id
    if not db.check_user_in_users(tg_id):
        # Данные пользователя
        tg_premium = 0

        # Если есть тг премиум
        if message.from_user.is_premium:
            tg_premium = 1

        # Добавление нового пользователя в users
        db.new_user_bd_add(tg_id, tg_premium)
        await message.answer(f'Вы зарегестрировались')
    elif len(message.text.split()) == 1:
        await message.answer(f'Вы уже авторизованы')

    host_tg_id = message.text.split()[-1].split('_')[0]
    host_tg_username = message.text.split()[-1].split('_')[1]
    print(host_tg_id, tg_id)
    if not db.check_user_in_referrals(tg_id) and len(message.text.split()) == 2 and int(host_tg_id) != int(tg_id):
        # Перевод даты в timestamp
        date_obj = datetime.strptime(str(message.date.date()), '%Y-%m-%d')
        invitation_date = date_obj.timestamp()

        # Добавление нового пользователя referrals
        db.referrals_user_bd_add(host_tg_id, tg_id, invitation_date)
        await message.answer(f'Вас добавил пользователь @{host_tg_username}')
    elif int(host_tg_id) == int(tg_id):
        await message.answer(f'Нельзя добавить самого себя')
    elif len(message.text.split()) == 2:
        await message.answer(f'Вас уже добавил пользователь')



@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await message.answer("Привет! Я бот!")


@dp.message(Command("help"))
async def cmd_help(message: types.Message):
    await message.answer("Можешь воспользоваться мини приложением, нажав на кнопку")


@dp.message(F.text)
async def echo_with_time(message: types.Message):
    await message.answer("Не понял тебя... \nНапиши /help чтобы узнать мои возможности")


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
