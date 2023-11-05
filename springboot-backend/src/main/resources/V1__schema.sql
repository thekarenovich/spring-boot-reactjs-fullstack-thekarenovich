CREATE TABLE people.`people`
(
    `id`         bigint(20)  NOT NULL AUTO_INCREMENT,
    `first_name` varchar(40) NOT NULL,
    `last_name`  varchar(40) NOT NULL,
    `email_id`   varchar(40) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_people_email_id` (`email_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;