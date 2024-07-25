update `Bonuses`
set `active_last_collect_date` = :active_last_collect_date
where `tg_id` = :tg_id;

update `Users`
set `active_bonuses_balanse` = `active_bonuses_balanse` + 1
where`tg_id` = :tg_id;

-- select `active_bonuses_balanse`
-- from `Users`
-- where `tg_id` = :tg_id;

