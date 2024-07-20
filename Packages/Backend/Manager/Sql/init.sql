drop table if exists `Bonuses`;
drop table if exists `Quests`;
drop table if exists `Referrals`;
drop table if exists `Users`;


create table if not exists `Bonuses` (
    `id` int not null auto_increment,
    `active_end_date` real not null default -1,
    `active_last_collect_date` real not null default -1,
    `passive_last_collect_date` real not null default -1,
    `tg_id` int not null,

    primary key (`id`)
);

create table if not exists `Quests` (
    `id` int not null auto_increment,
    `telegram` boolean not null default false,
    `tg_id` int not null,
    `twitter` boolean not null default false,

    primary key (`id`)
);

create table if not exists `Referrals` (
    `id` int not null auto_increment,
    `host_tg_id` int not null,
    `invitation_date` real not null default -1,
    `referral_tg_id` int not null,

    primary key (`id`)
);

create table if not exists `Users` (
    `id` int not null auto_increment,
    `active_bonuses_balanse` int not null default false,
    `date_registration` dateTime default current_timeStamp,
    `is_signed` boolean not null default false,
    `leval` int not null default 1,
    `passive_bonuses_balanse` int not null default false,
    `tg_id` int not null,
    `tg_premium` boolean not null default false,

    primary key (`id`)
);
