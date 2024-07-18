drop table if exists `Bonuses`;
drop table if exists `Quests`;
drop table if exists `Referrals`;
drop table if exists `Users`;


create table if not exists `Bonuses` (
  `id` int(6) not null,
  `active_end_date` dateTime,
  `active_last_collect_date` dateTime,
  `passive_last_collect_date` dateTime,
  `tg_id` int(11) not null,

  primary key (`id`)
);

create table if not exists `Quests` (
  `id` int(6) not null,
  `telegram` int(1) not null default '0',
  `tg_id` int(11) not null,
  `twitter` int(1) not null default '0',

  primary key (`id`)
);

create table if not exists `Referrals` (
  `id` int(6) not null,
  `host_tg_id` int(11) not null,
  `invitation_date` dateTime,
  `tg_id` int(11) not null,

  primary key (`id`)
);

create table if not exists `Users` (
  `id` int(6) not null,
  `active_bonuses_balanse` int(20) not null default '0',
  `is_signed` int(1) not null default '0',
  `passive_bonuses_balanse` int(20) not null default '0',
  `tg_id` int(11) not null,
  `tg_premium` int(1) not null default '0',

  primary key (`id`)
);
