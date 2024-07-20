import pymysql


class DataBase:
    def __init__(self):
        self.connection = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',
            password='',
            database='Cloud_bot',
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Успешное подключение...")
        print("#" * 20)

    def new_user_bd_add(self, tg_id, tg_premium):
        with self.connection.cursor() as cursor:
            insert_query = ("INSERT INTO `Users` "
                            "(tg_id, tg_premium) "
                            "VALUES "
                            f"({tg_id}, {tg_premium});")
            cursor.execute(insert_query)
            self.connection.commit()

    def referrals_user_bd_add(self, host_tg_id, referral_tg_id, invitation_date):
        with self.connection.cursor() as cursor:
            insert_query = ("INSERT INTO `Referrals` "
                            "(host_tg_id,     referral_tg_id, invitation_date) "
                            "VALUES "
                            f"({host_tg_id}, {referral_tg_id}, {invitation_date});")
            cursor.execute(insert_query)
            self.connection.commit()

    def check_users_bd(self):
        with self.connection.cursor() as cursor:
            select_all_rows = "SELECT * FROM `users`"
            cursor.execute(select_all_rows)

            rows = cursor.fetchall()
            for row in rows:
                print(row)
            print("#" * 20)

    def check_user_in_users(self, tg_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT * FROM `users` WHERE tg_id = {tg_id};"
            cursor.execute(select_all_rows)

            row = cursor.fetchone()
            return row

    def check_user_in_referrals(self, tg_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f"SELECT * FROM `referrals` WHERE referral_tg_id = {tg_id};"
            cursor.execute(select_all_rows)

            row = cursor.fetchone()
            return row

    def clear_db(self):
        with self.connection.cursor() as cursor:
            # insert_query = "TRUNCATE TABLE `users`, `referrals`, `quests`, `bonuses`;"
            # cursor.execute(insert_query)
            insert_query = "TRUNCATE TABLE `users`;"
            cursor.execute(insert_query)
            insert_query = "TRUNCATE TABLE `referrals`;"
            cursor.execute(insert_query)
            insert_query = "TRUNCATE TABLE `quests`;"
            cursor.execute(insert_query)
            insert_query = "TRUNCATE TABLE `bonuses`;"
            cursor.execute(insert_query)
            self.connection.commit()

    def __del__(self):
        self.connection.close()
