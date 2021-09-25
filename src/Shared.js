export default class Shared {
  static addZeroIfBelow10(x) {
    return x < 10 ? `0${x}` : x;
  }

  static generateDateFromTime(sqlTime) {
    const d = new Date(`01 Jan 1970 ${sqlTime} GMT+0200`);
    return d;
  }

  static fromDate2TimeString(date) {
    var hours = this.addZeroIfBelow10(date.getHours());
    var minutes = this.addZeroIfBelow10(date.getMinutes());
    const time = `${hours}:${minutes}`;
    return time;
  }

  static fromDate2DateString(date) {
    var year = this.addZeroIfBelow10(date.getUTCFullYear());
    var monthes = this.addZeroIfBelow10(date.getUTCMonth());
    var day = this.addZeroIfBelow10(date.getUTCDate());
    date = `${year}/${monthes}/${day}`;
    return date;
  }

  static fromSqlTime2TimeString(sqlTime) {
    const d = this.generateDateFromTime(sqlTime);
    const time = this.fromDate2TimeString(d);
    return time;
  }

  static fromSqlDate2TimeString(sqlDate) {
    const d = new Date(sqlDate);
    const time = this.fromDate2TimeString(d);
    return time;
  }

  static fromSqlDate2DateString(sqlDate) {
    const d = new Date(sqlDate);
    const time = this.fromDate2DateString(d);
    return time;
  }
}
