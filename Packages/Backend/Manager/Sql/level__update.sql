update `Users`
set `level` = `level` + :level
where `tg_id` = :tg_id;
