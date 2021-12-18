import student1 from "../../img/student1.png";
import student2 from "../../img/student2.jpeg";
import student3 from "../../img/student3.jpeg";
import teacher from "../../img/teacher.jpeg";

export const TEACHER_INFOS = {
  username: "Kelly",
  avatar: teacher,
};

export const COURSE_INFOS = {
  category: "程式",
  courseName: "一起來學習超潮的 Ruby 吧！",
  courseDescription:
    "經過幾年的發展，Spring Boot 的功能已經非常成熟，並且在近幾年軟體業盛行微服務（microservice）的設計模式下，也帶動越來越多企業選擇使用 Spring Boot 作為主流的開發工具。Spring Boot 之所以能夠成為目前業界最流行的開發工具，原因就在於 Spring Boot 憑借著 簡化 Spring 開發 以及 快速整合主流框架 的優點，讓工程師們可以更專注的在解決問題上，進而提升了前期開發和後續部署的效率。",
  price: 1000,
  published: true,
  audit: "success",
};

export const COURSE_EVENT_LIST = [
  {
    title: "一起來學習超潮的 Ruby 吧！",
    start: new Date(2021, 11, 12, 1, 30),
    end: new Date(2021, 11, 12, 2, 0),
    resource: {
      reserved: false,
      studentNotes: null,
      eventColor: "#22577A",
      timePeriod: "1:30 ~ 2:00",
    },
    id: "Plisyjyva2EPNFXJbTUUs",
  },
  {
    title: "一起來學習超潮的 Ruby 吧！",
    start: new Date(2021, 11, 13, 1, 30),
    end: new Date(2021, 11, 13, 2, 0),
    resource: {
      reserved: false,
      studentNotes: null,
      eventColor: "#22577A",
      timePeriod: "1:30 ~ 2:00",
    },
    id: "Hql9epDk2ladMYomuXv5C",
  },
  {
    title: "一起來學習超潮的 Ruby 吧！",
    start: new Date(2021, 11, 14, 1, 30),
    end: new Date(2021, 11, 14, 2, 0),
    resource: {
      reserved: false,
      studentNotes: null,
      eventColor: "#22577A",
      timePeriod: "1:30 ~ 2:00",
    },
    id: "T-dzEKLxfThGJWsjsV0fw",
  },
  {
    title: "一起來學習超潮的 Ruby 吧！",
    start: new Date(2021, 11, 12, 10, 30),
    end: new Date(2021, 11, 12, 11, 0),
    resource: {
      reserved: false,
      studentNotes: null,
      eventColor: "#22577A",
      timePeriod: "10:30 ~ 11:00",
    },
    id: "Plisyjyva2EPNFXJbTUUs",
  },
  {
    title: "一起來學習超潮的 Ruby 吧！",
    start: new Date(2021, 11, 20, 22, 30),
    end: new Date(2021, 11, 20, 23, 0),
    resource: {
      reserved: false,
      studentNotes: null,
      eventColor: "#22577A",
      timePeriod: "22:30 ~ 23:00",
    },
    id: "Plisyjyva2EPNFXJbTUUs",
  },
];

export const COMMENTS = [
  {
    imgSrc: student1,
    username: "小豪",
    content:
      "課程將SQL的語法結構邏輯以及重要語法的功能與使用觀念，以非常循序漸進的主題節奏來教學，讓我能逐步由淺入深地建構對SQL重點觀念的理解，原本自己對於SQL有些粗淺的認識、但對於實際運用時的語法運作邏輯並不是那麼有把握，經過課程系統性的教學、以及每章節課後練習題立即的複習、演練、體驗該章節語法的運作邏輯，讓我釐清許多過去常常不知其所以然的語法邏輯卡關，實際演練練習題不僅能從做中學也讓人很有成就感，有動力及信心繼續深入學習。",
  },
  {
    imgSrc: student2,
    username: "小葵",
    content:
      "課程將SQL的語法結構邏輯以及重要語法的功能與使用觀念，以非常循序漸進的主題節奏來教學，讓我能逐步由淺入深地建構對SQL重點觀念的理解，原本自己對於SQL有些粗淺的認識、但對於實際運用時的語法運作邏輯並不是那麼有把握，經過課程系統性的教學、以及每章節課後練習題立即的複習、演練、體驗該章節語法的運作邏輯，讓我釐清許多過去常常不知其所以然的語法邏輯卡關，實際演練練習題不僅能從做中學也讓人很有成就感，有動力及信心繼續深入學習。",
  },
  {
    imgSrc: student3,
    username: "小花",
    content:
      "課程將SQL的語法結構邏輯以及重要語法的功能與使用觀念，以非常循序漸進的主題節奏來教學，讓我能逐步由淺入深地建構對SQL重點觀念的理解，原本自己對於SQL有些粗淺的認識、但對於實際運用時的語法運作邏輯並不是那麼有把握，經過課程系統性的教學、以及每章節課後練習題立即的複習、演練、體驗該章節語法的運作邏輯，讓我釐清許多過去常常不知其所以然的語法邏輯卡關，實際演練練習題不僅能從做中學也讓人很有成就感，有動力及信心繼續深入學習。",
  },
];
