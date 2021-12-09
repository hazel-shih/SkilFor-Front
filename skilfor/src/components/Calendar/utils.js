import { TIME_OPTIONS } from "./constants";

//使用者選定開始的選項後，產出結束的選項
export const createTimeOptions = (timeType, time) => {
  console.log(timeType, time);
  //沒給定開始時間的結束時間選單
  if (!time && timeType === "end") {
    let endOptions = TIME_OPTIONS.slice(1, TIME_OPTIONS.length);
    return endOptions;
  }
  //給定開始時間的結束時間選單
  if (time && timeType === "end") {
    let endOptions = TIME_OPTIONS.slice(
      TIME_OPTIONS.indexOf(time) + 1,
      TIME_OPTIONS.length
    );
    return endOptions;
  }
  //開始時間選單
  if (timeType === "start") {
    return TIME_OPTIONS.slice(0, TIME_OPTIONS.length - 1);
  }
};

//處理星期格式
let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
export const getDay = (dayNum) => {
  return dayArr[dayNum];
};
//處理文字時間轉數字時間格式
export const getTimeNumber = (timeStr) => {
  let timeNoon = timeStr.slice(0, 2);
  timeStr = timeStr.slice(2, timeStr.length);
  let timeArr = timeStr.split(":").map((item) => Number(item));
  if (timeNoon === "下午") {
    timeArr[0] += 12;
  }
  return timeArr;
};

//檢查新增的 event 是否和既有的 events 有時間衝突
export const checkOverlap = (a, b) => {
  if (
    (a[0] > b[0] && a[0] < b[1]) ||
    (a[1] > b[0] && a[1] < b[1]) ||
    (a[0] === b[0] && a[1] === b[1])
  ) {
    return true;
  } else {
    return false;
  }
};
export const checkEventsConflict = (
  events,
  formatedStartTime,
  formatedEndTime
) => {
  let today = formatedStartTime.getDate();
  let todayEvents = events.filter((event) => event.start.getDate() === today);
  if (todayEvents.length === 0) {
    return false;
  } else {
    let startPoint = formatedStartTime.getTime();
    let endPoint = formatedEndTime.getTime();
    for (let i = 0; i < todayEvents.length; i++) {
      let eventStartTime = todayEvents[i].start.getTime();
      let eventEndTime = todayEvents[i].end.getTime();
      if (
        checkOverlap([startPoint, endPoint], [eventStartTime, eventEndTime]) ||
        checkOverlap([eventStartTime, eventEndTime], [startPoint, endPoint])
      ) {
        return true;
      }
    }
    return false;
  }
};
