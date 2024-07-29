update `Referrals`
set `bonus` = `bonus` + 0.75
where `tg_id` = :tg_id;
