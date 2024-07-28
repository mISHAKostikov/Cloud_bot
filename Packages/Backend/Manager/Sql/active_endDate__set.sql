update `Bonuses`
set `active_bonuses_end_date` = `active_bonuses_end_date` + :time
where `tg_id` = :tg_id;
