insert into `Bonuses` (
  `active_end_date`,
  `active_last_collect_date`,
  `passive_last_collect_date`,
  `tg_id`
)
values
    (1721389893129, 1721379893129, 1721379894129, 4623423),
    (-1, -1, 1721379894130, 4623424);

insert into `Quests` (
  `telegram`,
  `tg_id`,
  `twitter`
)
values
    (true, 4623424, false),
    (true, 4623425, true),
    (false, 4623426, true);

insert into `Referrals` (
  `host_tg_id`,
  `invitation_date`,
  `referral_tg_id`
)
values (
    4623423,
    1721379693129,
    4623424
);

insert into `Users` (
  `active_bonuses_balanse`,
  `is_signed`,
  `passive_bonuses_balanse`,
  `tg_id`,
  `tg_premium`
)
values
    (10, true, 20, 4623423, false),
    (0, false, 5, 4623424, true),
    (0, false, 0, 4623425, false),
    (0, false, 0, 4623426, false);
