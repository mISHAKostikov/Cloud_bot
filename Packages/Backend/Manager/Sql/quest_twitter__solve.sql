update `Quests`
set `twitter` = 1
where `tg_id` = :tg_id;

update `Users`
set `passive_bonuses_balanse` = `passive_bonuses_balanse` + 200
where `tg_id` = :tg_id;
