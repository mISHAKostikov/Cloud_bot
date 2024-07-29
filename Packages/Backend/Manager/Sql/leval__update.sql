update `Users`
set `leval` = `leval` + :leval
where `tg_id` = :tg_id;
