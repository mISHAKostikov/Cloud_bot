update `Users`
set
    `everyday_bonus` = `everyday_bonus` + 1,
    `passive_bonuses_balanse` = `passive_bonuses_balanse` + 10
where `tg_id` = :tg_id;

