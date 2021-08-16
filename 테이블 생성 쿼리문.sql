CREATE TABLE `user` (
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `salt` varchar(100) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `calendar` (
  `calendar_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  `color` varchar(10) NOT NULL,
  `bounds` varchar(10) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  PRIMARY KEY (`calendar_id`),
  KEY `fk1_idx` (`user_email`),
  CONSTRAINT `fk1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

CREATE TABLE `user_calendar` (
  `user_email` varchar(40) NOT NULL,
  `calendar_id` int(11) NOT NULL,
  `visible` varchar(5) NOT NULL DEFAULT 'true',
  PRIMARY KEY (`user_email`,`calendar_id`),
  KEY `fk3_idx` (`calendar_id`),
  CONSTRAINT `fk4` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk5` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`calendar_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8 NOT NULL,
  `start` varchar(45) CHARACTER SET latin1 NOT NULL,
  `end` varchar(45) CHARACTER SET latin1 NOT NULL,
  `calendar_id` int(11) NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_idx` (`calendar_id`),
  CONSTRAINT `fk` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`calendar_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
