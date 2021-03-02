import request from "../utils/request";

interface Coordinate {
  longitude: number;
  latitude: number;
}

interface ClockInParams extends Coordinate {
  userId: number;
}

const URL = {
  clockIn: "api/services/system/Attendance/clock", //签到打卡
  getClockLog: "/api/services/system/Attendance/DaySummary",
};

export default {
  clockIn(params: ClockInParams) {
    return request(URL.clockIn, "get", {}, params);
  },
  getClockLog() {
    return request(URL.getClockLog, "get");
  },
};
