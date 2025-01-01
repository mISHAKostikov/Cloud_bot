select
    `Bonuses`.`active_end_date` as `active_end_date`,
    `Quests`.`telegram` as `quest_telegram`,
    `Quests`.`twitter` as `quest_twitter`,
    `Referrals_temp`.`count_referrals` as `count_referrals`,
    `Referrals_temp`.`bonus_referrals` as `bonus_referrals`,
    `Users`.`active_bonuses_balanse` as `active_bonuses_balanse`,
    `Users`.`everyday_bonus` as `everyday_bonus_current`,
    `Users`.`level` as `level`,
    `Users`.`passive_bonuses_balanse` as `passive_bonuses_balanse`,
    datediff(current_timeStamp, `Users`.`date_registration`) as `count_day_registration`
from
    `Users`
    left join (
        select
            `host_tg_id`,
            count(*) as `count_referrals`,
            sum(`bonus`) as `bonus_referrals`
        from `Referrals`
        group by `Referrals`.`host_tg_id`
    ) as `Referrals_temp` on `Referrals_temp`.`host_tg_id` = `Users`.`tg_id`
    left join `Bonuses` on `Bonuses`.`tg_id` = `Users`.`tg_id`
    left join `Quests` on `Quests`.`tg_id` = `Users`.`tg_id`
where
    `Users`.`tg_id` = :tg_id;
