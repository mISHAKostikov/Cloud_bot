import pymysql


class DataBase:
    def new_user_bd_add(self, tg_id, tg_premium):
        with self.connection.cursor() as cursor:
            insert_query = f'''
                insert ignore into `Users` (
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

    def referrals_user_bd_add(self, host_tg_id, referral_tg_id, invitation_date):
        with self.connection.cursor() as cursor:
            insert_query =  f'''
                insert into `Referrals` (
                    host_tg_id,
                    referral_tg_id,
                    invitation_date
                )
                values (
                    {host_tg_id},
                    {referral_tg_id},
                    {invitation_date}
                );
            '''

            cursor.execute(insert_query)
            self.connection.commit()

    def check_users_bd(self):
        with self.connection.cursor() as cursor:
            cursor.execute('select * from `Users`')
            rows = cursor.fetchall()

            for row in rows:
                print(row)

            print('#' * 20)

    def check_user_in_users(self, tg_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f'''
                select *
                from `Users`
                where tg_id = {tg_id};
            '''
            cursor.execute(select_all_rows)
            row = cursor.fetchone()

            return row

    def check_user_in_referrals(self, tg_id):
        with self.connection.cursor() as cursor:
            select_all_rows = f'''
                select *
                from `Referrals`
                where referral_tg_id = {tg_id};
            '''
            cursor.execute(select_all_rows)
            row = cursor.fetchone()

            return row

    def clear_db(self):
        with self.connection.cursor() as cursor:
            tables = ['Bonuses', 'Quests', 'Referrals', 'Users']

            for table in tables:
                cursor.execute(f'truncate table `{table}`')

            self.connection.commit()


    def __del__(self):
        self.connection.close()

    def __init__(self):
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
