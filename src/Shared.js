export default class Shared {
  static addZeroIfBelow10(x) {
    return x < 10 ? `0${x}` : x;
  }

  static generateDateFromTime(sqlTime) {
    const d = new Date(`01 Jan 1970 ${sqlTime} GMT`);
    return d;
  }

  static fromDate2TimeString(date) {
    var hours = this.addZeroIfBelow10(date.getHours());
    var minutes = this.addZeroIfBelow10(date.getMinutes());
    const time = `${hours}:${minutes}`;
    return time;
  }

  static fromSqlTime2TimeString(sqlTime) {
    const d = this.generateDateFromTime(sqlTime);
    const time = this.fromDate2TimeString(d);
    return time;
  }





}
