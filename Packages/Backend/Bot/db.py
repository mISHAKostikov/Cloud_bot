import pymysql


class DataBase:
    def connection__cose(self):
        self.connection.close()

    def connection__open(self):
        self.connection = pymysql.connect(
            host = '127.0.0.1',
            port = 3306,
            user = 'root',
            password = '',
            database = 'Cloud_bot',
            cursorclass = pymysql.cursors.DictCursor
        )

        print('Успешное подключение...')
        print('#' * 20)

    def db__clear(self):
        with self.connection.cursor() as cursor:
            tables = ['Bonuses', 'Quests', 'Referrals', 'Users']

            for table in tables:
                cursor.execute(f'truncate table `{table}`')

            self.connection.commit()

    def init(self):
        with self.connection.cursor() as cursor:
            cursor.execute('SET SESSION query_cache_type = OFF;')

            self.connection.commit()

    def referral__add(self, host_tg_id, payment, invitation_date, referral_tg_id):
        with self.connection.cursor() as cursor:
            insert_query =  f'''
                insert into `Referrals` (
                    host_tg_id,
                    invitation_date,
                    payment,
                    referral_tg_id
                )
                values (
                    {host_tg_id},
                    {invitation_date},
                    {payment},
                    {referral_tg_id}
                );
            '''
            cursor.execute(insert_query)

            update_query = f'''
                update `Users`
                set `passive_bonuses_balanse` = `passive_bonuses_balanse` + {payment}
                where`tg_id` = {host_tg_id};
            '''

            cursor.execute(insert_query)
            self.connection.commit()

            self.connection.commit()

    def user__add(self, tg_id, tg_premium):
        with self.connection.cursor() as cursor:
            insert_query = f'''
                insert into `Users` (
                    tg_id,
                    tg_premium
                )
                values (
                    {tg_id},
                    {tg_premium}
                );
            '''

            cursor.execute(insert_query)
            self.connection.commit()

    def user__get(self, tg_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f'''
                select `id`
                from `Users`
                where tg_id = {tg_id};
            '''
            cursor.execute(select_all_rows)
            row = cursor.fetchone()

            return row


    def __del__(self):
        self.connection__cose()

    def __init__(self):
        self.connection__open()
