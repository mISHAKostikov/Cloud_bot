update `Bonuses`
set
    `passive_last_collect_date` = :passive_last_collect_date
where
    `tg_id` = :tg_id;

update `Users`
set
    `passive_bonuses_balanse` = `passive_bonuses_balanse` + 1
where
    `tg_id` = :tg_id;

select `passive_bonuses_balanse`
from `Users`
where `tg_id` = :tg_id;
