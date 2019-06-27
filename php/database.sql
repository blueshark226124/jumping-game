CREATE TABLE `jumpinglion`.`staff` (  
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(50) NOT NULL,
  `flag` TINYINT NOT NULL DEFAULT 0 COMMENT '1->staff',
  PRIMARY KEY (`id`)
);

CREATE TABLE `jumpinglion`.`rework` (  
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(50) NOT NULL,
  `total` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `jumpinglion`.`campaigns` (  
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `campaign_id` VARCHAR(20) NOT NULL,
  `active` TINYINT(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

ALTER TABLE `jumpinglion`.`result`   
	ADD COLUMN `win` TINYINT(1) DEFAULT 0 NOT NULL AFTER `date`;