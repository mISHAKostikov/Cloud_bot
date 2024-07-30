insert into `Bonuses` (
    `active_bonuses_collect_date`,
    `active_end_date`,
    `passive_last_collect_date`,
    `tg_id`
)
values
    (1722345211.1912, 1722345306.607066, 1722345934.4427, 1316897349),
    (-1, -1, 1722347374.7856, 509815216)
;

insert into `Referrals` (
    `bonus`,
    `host_tg_id`,
    `invitation_date`,
    `payment`,
    `referral_tg_id`
)
values
    (0.25, 509815216, 1722156703.1125321, 50, 1316897349),
    (0.25, 509815216, 1722163067.6788912, 50, 1571127511),
    (1, 509815216, 1722117814.4632, 200, 1765878957),
    (0.25, 509815216, 1724796218.5346, 50, 1753239797)
;

insert into `Users` (
    `active_bonuses_balanse`,
    `date_registration`,
    `everyday_bonus`,
    `level`,
    `passive_bonuses_balanse`,
    `tg_id`,
    `tg_premium`
)
values
    (177665, '2024-07-28 11:51:42', 2, 1, 254, 1316897349, 0),
    (6, '2024-07-26 13:16:59', 4, 20, 141, 509815216, 0),
    (0, '2024-07-28 13:37:46', 0, 2, 0, 1571127511, 0),
    (0, '2024-07-28 01:03:34', 0, 1, 0, 1765878957, 0),
    (0, '2024-07-28 01:03:38', 0, 1, 0, 1753239797, 0)
;
