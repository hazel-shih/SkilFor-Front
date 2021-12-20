import { getAuthToken } from "./utils";
const BASE_URL = "https://skilforapi.bocyun.tw";

export const login = async (loginData, setErrorMessage) => {
  try {
    const res = await fetch(`${BASE_URL}/members/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (!res.ok) {
      throw new Error("fail to fetch data");
    }
    return await res.json();
  } catch (error) {
    return setErrorMessage("發生了一點錯誤，請稍後再試");
  }
};

export const getMyUserData = async () => {
  try {
    const token = getAuthToken();
    const res = await fetch(`${BASE_URL}/members/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fail to fetch data");
    }
    return await res.json();
  } catch (error) {
    return error.message;
  }
};

export const register = async (registerData, setErrorMessage) => {
  try {
    const res = await fetch(`${BASE_URL}/members/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    if (!res.ok) {
      throw new Error("fail to fetch data");
    }
    return await res.json();
  } catch (error) {
    return setErrorMessage("發生了一點錯誤，請稍後再試");
  }
};

export const getUserInfos = async (setApiError) => {
  let url = `${BASE_URL}/user/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const updateUserInfos = async (setApiError, newTeacherInfos) => {
  let url = `${BASE_URL}/user/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTeacherInfos),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const getAllCategories = async (setApiError) => {
  let url = `${BASE_URL}/categories`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const getTeacherCourseInfos = async (setApiError, params) => {
  let url;
  if (params) {
    url = encodeURI(`${BASE_URL}/teacher/course/info?${params}`);
  } else {
    url = `${BASE_URL}/teacher/course/info`;
  }
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("fail to fetch data");
    }
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const registerNewCourse = async (setApiError, newCourseInfos) => {
  let url = `${BASE_URL}/teacher/course/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCourseInfos),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const updateCourseInfos = async (setApiError, newCourseInfos) => {
  let url = `${BASE_URL}/teacher/course/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCourseInfos),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return;
  }
};

export const deleteCourse = async (setApiError, courseId) => {
  let url = `${BASE_URL}/teacher/course/info`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: courseId,
      }),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const getSpecificCourse = async (categoryName, setApiError) => {
  let url = `${BASE_URL}/filter/course/${categoryName}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return error.message;
  }
};

export const getAllCourses = async (setApiError) => {
  let url = `${BASE_URL}/filter/course`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return error.message;
  }
};

//行事曆管理頁面
export const getCalendarMonthEvents = async (setApiError, month) => {
  let url = encodeURI(`${BASE_URL}/teacher/calendar?month=${month}`);
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return;
  }
};
export const addNewCalendarEvent = async (setApiError, newEvent) => {
  let url = `${BASE_URL}/teacher/calendar`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEvent),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return;
  }
};
export const deleteCalendarEvent = async (setApiError, eventId) => {
  let url = `${BASE_URL}/teacher/calendar`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: eventId,
      }),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return;
  }
};
//課程前台頁面
export const getFrontCourseInfos = async (courseId, setApiError) => {
  let url = encodeURI(`${BASE_URL}/front-course/${courseId}`);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return;
  }
};
export const getFrontCalendarMonthEvents = async (
  courseId,
  month,
  setApiError
) => {
  let url = encodeURI(
    `${BASE_URL}/front-calendar?courseId=${courseId}&month=${month}`
  );
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    setApiError("發生了一點錯誤，請稍後再試");
    return;
  }
};
export const addCartItem = async (setApiError, eventId) => {
  let url = `${BASE_URL}/shopping-cart`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scheduleId: eventId,
      }),
    });
    if (!res.ok) throw new Error("fail to add cart item");
    return await res.json();
  } catch (error) {
    return setApiError("目前無法新增課程至購物車，請稍後再試");
  }
};

export const getCartItems = async (setApiError) => {
  let url = `${BASE_URL}/shopping-cart`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};

export const deleteCartItem = async (scheduleId, setApiError) => {
  let url = `${BASE_URL}/shopping-cart`;
  const token = getAuthToken();
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scheduleId,
      }),
    });
    if (!res.ok) throw new Error("fail to fetch data");
    return await res.json();
  } catch (error) {
    return setApiError("發生了一點錯誤，請稍後再試");
  }
};
