import asyncio
import logging

from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command

from config import TG_BOT_TOKEN

logging.basicConfig(level=logging.INFO)
bot = Bot(token=TG_BOT_TOKEN)
dp = Dispatcher()


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
