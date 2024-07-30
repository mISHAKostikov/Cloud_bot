update `Users`
set `active_bonuses_balanse` = `active_bonuses_balanse` + (:active_bonuses_balanse * `level`)
where`tg_id` = :tg_id;

update `Bonuses`
set `active_bonuses_collect_date` = :active_bonuses_collect_date
where `tg_id` = :tg_id;
