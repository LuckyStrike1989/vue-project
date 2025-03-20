-- tb_member table이 있으면 삭제
DROP TABLE IF EXISTS tb_member;

-- tb_member table 생성
CREATE TABLE tb_member (
    seq int NOT NULL AUTO_INCREMENT COMMENT '사용자 일련번호',
    mbr_id varchar(50) NOT NULL COMMENT '사용자 ID',
    mbr_pw varchar(125) NOT NULL COMMENT '사용자 비밀번호',
    mbr_name varchar(50) NOT NULL COMMENT '사용자 이름',
    mbr_roles varchar(250) NOT NULL COMMENT '사용자 롤',
    reg_dtm datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    CONSTRAINT tb_member_pk PRIMARY KEY (seq)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci
COMMENT='사용자';

INSERT INTO tb_member (mbr_id, mbr_pw, mbr_name, mbr_roles, reg_dtm) VALUES('test1', 'test1', '테스트1', 'ROLE_USER', '2025-03-06 14:12:00.000');
