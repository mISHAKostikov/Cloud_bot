select
    `Users`.`everyday_bonus` as `everyday_bonus_current`,
    datediff(current_timestamp, `Users`.`date_registration`) as `count_day_registration`
from `Users`
where `Users`.`tg_id` = :tg_id;
