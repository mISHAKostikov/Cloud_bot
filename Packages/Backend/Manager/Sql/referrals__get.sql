select
    `Referrals_process`.`bonus` as `bonus`,
    `Referrals_process`.`payment` as `payment`,
    `Users`.`leval` as `leval`,
    `Users`.`tg_id` as `tg_id`
from `Users`
    left join (
        select
            `bonus`,
            `host_tg_id`,
            `payment`,
            `referral_tg_id`
        from `Referrals`
        where `host_tg_id` = :tg_id
    ) as `Referrals_process` on `Referrals_process`.`referral_tg_id` = `Users`.`tg_id`
where
    `Referrals_process`.`referral_tg_id` = `Users`.`tg_id`
limit :offset, 1
