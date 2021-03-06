import { enc } from "crypto-js";
import sha256 from "crypto-js/sha256";
const TEST_HASH_KEY = "5294y06JbISpM5x9";
const TEST_HASH_IV = "v77hoKGq4kWxNNIS";

export const generateCheckMacValue = (data) => {
  const keys = Object.keys(data).sort();
  let checkValue = "";
  for (const key of keys) {
    checkValue += `${key}=${data[key]}&`;
  }
  checkValue = `HashKey=${TEST_HASH_KEY}&${checkValue}HashIV=${TEST_HASH_IV}`;
  checkValue = encodeURIComponent(checkValue).toLowerCase();
  checkValue = checkValue
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%20/g, "+");

  checkValue = sha256(checkValue).toString(enc.Hex);
  checkValue = checkValue.toUpperCase();
  return checkValue;
};

export const createMerchantTradeNo = () => {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += Math.ceil(Math.random() * 10);
  }
  str = "SkilFor" + str;
  return str;
};

export const getCurrentTime = () => {
  var dt = new Date();
  return `${dt.getFullYear().toString().padStart(4, "0")}/${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dt.getDate().toString().padStart(2, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
