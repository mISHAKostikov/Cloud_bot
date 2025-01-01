drop table if exists `Bonuses`;
drop table if exists `Quests`;
drop table if exists `Referrals`;
drop table if exists `Users`;


create table if not exists `Bonuses` (
    `active_bonuses_collect_date` real default -1,
    `active_end_date` real default -1,
    `id` int not null auto_increment,
    `passive_last_collect_date` real default -1,
    `tg_id` int not null,

    primary key (`id`),
    unique key (`tg_id`)
);

create table if not exists `Quests` (
    `id` int not null auto_increment,
    `telegram` boolean default false,
    `tg_id` int not null,
    `twitter` boolean default false,

    primary key (`id`)
);

create table if not exists `Referrals` (
    `bonus` real default 0.25,
    `host_tg_id` int not null,
    `id` int not null auto_increment,
    `invitation_date` real default -1,
    `payment` int default 50,
    `referral_tg_id` int not null,

    primary key (`id`)
);

create table if not exists `Users` (
    `active_bonuses_balanse` int default 0,
    `date_registration` dateTime default current_timeStamp,
    `everyday_bonus` int default -1,
    `id` int not null auto_increment,
    `level` int default 1,
    `passive_bonuses_balanse` int default 0,
    `tg_id` int not null,
    `tg_premium` boolean default false,

    primary key (`id`),
    unique key (`tg_id`)
);
