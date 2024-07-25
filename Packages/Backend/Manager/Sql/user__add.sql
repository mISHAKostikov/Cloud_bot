if not exists (select `id` from `Users` where `tg_id` = :tg_id)
begin
    insert into `Users` (
      `active_bonuses_balanse`,
      `is_signed`,
      `leval`,
      `passive_bonuses_balanse`,
      `tg_id`,
      `tg_premium`
    )
    values (
        :active_bonuses_balanse,
        :is_signed,
        :leval,
        :passive_bonuses_balanse,
        :tg_id,
        :tg_premium
    );
end;
