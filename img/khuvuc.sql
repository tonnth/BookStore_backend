/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : websitebansach

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-05-19 15:39:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for khuvuc
-- ----------------------------
DROP TABLE IF EXISTS `khuvuc`;
CREATE TABLE `khuvuc` (
  `MaKhuVuc` int(255) NOT NULL AUTO_INCREMENT,
  `TenKhuVuc` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `PhiGiaoHang` int(255) DEFAULT NULL,
  PRIMARY KEY (`MaKhuVuc`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of khuvuc
-- ----------------------------
INSERT INTO `khuvuc` VALUES ('1', 'Vũng Tàu', '10000');
INSERT INTO `khuvuc` VALUES ('2', 'Huế', '30000');
INSERT INTO `khuvuc` VALUES ('3', 'TPHCM', '10000');
INSERT INTO `khuvuc` VALUES ('4', 'Quảng Bình', '40000');
INSERT INTO `khuvuc` VALUES ('5', 'Kiên Giang', '20000');
INSERT INTO `khuvuc` VALUES ('6', 'Quảng Ninh', '20000');
INSERT INTO `khuvuc` VALUES ('7', 'Khánh Hòa', '25000');
INSERT INTO `khuvuc` VALUES ('8', 'An Giang', '15000');
INSERT INTO `khuvuc` VALUES ('9', 'Bạc Liêu', '15000');
INSERT INTO `khuvuc` VALUES ('10', 'Bắc Kạn', '20000');
INSERT INTO `khuvuc` VALUES ('11', 'Bắc Giang', '20000');
INSERT INTO `khuvuc` VALUES ('12', 'Bắc Ninh', '20000');
INSERT INTO `khuvuc` VALUES ('13', 'Bến Tre', '15000');
INSERT INTO `khuvuc` VALUES ('14', 'Bình Dương', '10000');
INSERT INTO `khuvuc` VALUES ('15', 'Bình Định', '15000');
INSERT INTO `khuvuc` VALUES ('16', 'Bình Phước', '10000');
INSERT INTO `khuvuc` VALUES ('17', 'Bình Thuận', '15000');
INSERT INTO `khuvuc` VALUES ('18', 'Cao Bằng', '15000');
INSERT INTO `khuvuc` VALUES ('19', 'Cần Thơ', '10000');
INSERT INTO `khuvuc` VALUES ('20', 'Đà Nẵng', '15000');
INSERT INTO `khuvuc` VALUES ('21', 'Đồng Nai', '15000');
INSERT INTO `khuvuc` VALUES ('22', 'Đồng Tháp', '10000');
INSERT INTO `khuvuc` VALUES ('23', 'Điện Biên', '10000');
INSERT INTO `khuvuc` VALUES ('24', 'Gia Lai', '20000');
INSERT INTO `khuvuc` VALUES ('25', 'Hà Giang', '10000');
INSERT INTO `khuvuc` VALUES ('26', 'Hà Nam', '10000');
INSERT INTO `khuvuc` VALUES ('27', 'Hà Nội', '15000');
INSERT INTO `khuvuc` VALUES ('28', 'Hà Tĩnh', '15000');
INSERT INTO `khuvuc` VALUES ('29', 'Hải Dương', '20000');
INSERT INTO `khuvuc` VALUES ('30', 'Hòa Bình', '30000');
INSERT INTO `khuvuc` VALUES ('31', 'Hậu Giang', '20000');
INSERT INTO `khuvuc` VALUES ('32', 'Hưng Yên', '20000');
INSERT INTO `khuvuc` VALUES ('33', 'Kon Tum', '30000');
INSERT INTO `khuvuc` VALUES ('34', 'Lai Châu', '40000');
INSERT INTO `khuvuc` VALUES ('35', 'Lào Cai', '40000');
INSERT INTO `khuvuc` VALUES ('36', 'Lạng Sơn', '20000');
INSERT INTO `khuvuc` VALUES ('37', 'Lâm Đồng', '20000');
INSERT INTO `khuvuc` VALUES ('38', 'Long An', '25000');
INSERT INTO `khuvuc` VALUES ('39', 'Nam Định', '20000');
INSERT INTO `khuvuc` VALUES ('40', 'Nghệ An', '25000');
INSERT INTO `khuvuc` VALUES ('41', 'Ninh Bình', '20000');
INSERT INTO `khuvuc` VALUES ('42', 'Ninh Thuận', '30000');
INSERT INTO `khuvuc` VALUES ('43', 'Phú Thọ', '30000');
INSERT INTO `khuvuc` VALUES ('44', 'Phú Yên', '20000');
INSERT INTO `khuvuc` VALUES ('45', 'Quảng Nam', '20000');
INSERT INTO `khuvuc` VALUES ('46', 'Quảng Ngãi', '15000');
INSERT INTO `khuvuc` VALUES ('47', 'Quảng Trị', '10000');
INSERT INTO `khuvuc` VALUES ('48', 'Sóc Trăng', '20000');
INSERT INTO `khuvuc` VALUES ('49', 'Sơn La', '15000');
INSERT INTO `khuvuc` VALUES ('50', 'Tây Ninh', '18000');
INSERT INTO `khuvuc` VALUES ('51', 'Thái Bình', '30000');
INSERT INTO `khuvuc` VALUES ('52', 'Thái Nguyên', '26000');
INSERT INTO `khuvuc` VALUES ('53', 'Thanh Hóa', '30000');
INSERT INTO `khuvuc` VALUES ('54', 'Tiền Giang', '25000');
INSERT INTO `khuvuc` VALUES ('55', 'Trà Vinh', '30000');
INSERT INTO `khuvuc` VALUES ('56', 'Tuyên Quang', '25000');
INSERT INTO `khuvuc` VALUES ('57', 'Vĩnh Long', '20000');
INSERT INTO `khuvuc` VALUES ('58', 'Vĩnh Phúc', '25000');
INSERT INTO `khuvuc` VALUES ('59', 'Yên Bái', '30000');
INSERT INTO `khuvuc` VALUES ('60', 'Hải Phòng', '30000');
INSERT INTO `khuvuc` VALUES ('61', 'Đắk Lắk', '30000');
INSERT INTO `khuvuc` VALUES ('62', 'Đắk Nông', '30000');
INSERT INTO `khuvuc` VALUES ('63', 'Cà Mau', '20000');
SET FOREIGN_KEY_CHECKS=1;
