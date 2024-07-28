select
    `active_end_date`,
    `active_bonuses_collect_date`,
    `id`
from `Bonuses`
where `tg_id` = :tg_id
