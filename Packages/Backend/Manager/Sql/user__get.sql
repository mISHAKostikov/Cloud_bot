select
    `Bonuses`.`active_last_collect_date` as `active_last_collect_date`,
    `Quests`.`telegram` as `telegram`,
    `Quests`.`twitter` as `twitter`,
    `Referrals_count`.`count_referrals`,
    `Users`.`active_bonuses_balanse` as `active_bonuses_balanse`,
    `Users`.`everyday_bonus` as `everyday_bonus_current`,
    `Users`.`leval` as `leval`,
    `Users`.`passive_bonuses_balanse` as `passive_bonuses_balanse`,
    datediff(current_timestamp, `Users`.`date_registration`) as `count_day_registration`
from
    `Users`
    left join (
        select `host_tg_id`, count(*) as `count_referrals`
        from `Referrals`
        GROUP BY `Referrals`.`host_tg_id`
    ) as `Referrals_count` on `Referrals_count`.`host_tg_id` = `Users`.`tg_id`
    left join `Bonuses` on `Bonuses`.`tg_id` = `Users`.`tg_id`
    left join `Quests` on `Quests`.`tg_id` = `Users`.`tg_id`
where
    `Users`.`tg_id` = :tg_id;
