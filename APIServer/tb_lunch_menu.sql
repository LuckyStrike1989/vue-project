-- lunchdb Database가 있으면 삭제
DROP DATABASE IF EXISTS lunchdb;

-- lunchdb Database가 없으면 생성
CREATE DATABASE IF NOT EXISTS lunchdb;

use lunchdb;

-- tb_lunch_menu table이 있으면 삭제
DROP TABLE IF EXISTS tb_lunch_menu;

-- TEST_TB table 생성
CREATE TABLE IF NOT EXISTS tb_lunch_menu (
  seq int NOT NULL AUTO_INCREMENT COMMENT '점심 메뉴 일련번호',
  menu_name varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '점심 메뉴 명',
  reg_dtm datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (`seq`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='점심 메뉴';

INSERT INTO tb_lunch_menu (menu_name, reg_dtm) VALUES('자장면', '2025-01-17 13:37:00.000');
INSERT INTO tb_lunch_menu (menu_name, reg_dtm) VALUES('짬봉', '2025-01-17 13:37:14.000');
INSERT INTO tb_lunch_menu (menu_name, reg_dtm) VALUES('뽁음밥', '2025-01-17 13:37:26.000');