export default class Shared {

  /**
   * adds '0' before digit that is lower than 10
   * @param {*} x 
   * @returns 
   */
  static addZeroIfBelow10(x) {
    return x < 10 ? `0${x}` : x;
  }

  /**
   * returns Date object out of sql time
   * @param {*} sqlTime 
   * @returns 
   */
  static generateDateFromTime(sqlTime) {
    const d = new Date(`01 Jan 1970 ${sqlTime} GMT+0200`);
    return d;
  }

    /**
   * returns time string to display date ob
   * @param {*} date 
   * @returns 
   */
  static fromDate2TimeString(date) {
    var hours = this.addZeroIfBelow10(date.getHours());
    var minutes = this.addZeroIfBelow10(date.getMinutes());
    const time = `${hours}:${minutes}`;
    return time;
  }

  /**
   * returns date string to display date ob
   * @param {*} date 
   * @returns 
   */
  static fromDate2DateString(date) {
    var year = this.addZeroIfBelow10(date.getUTCFullYear());
    var monthes = this.addZeroIfBelow10(date.getUTCMonth() + 1);
    var day = this.addZeroIfBelow10(date.getUTCDate());
    date = `${year}/${monthes}/${day}`;
    return date;
  }

  /**
   * returns Time string to display out of Time got from sql
   * @param {*} sqlTime 
   * @returns 
   */
  static fromSqlTime2TimeString(sqlTime) {
    const d = this.generateDateFromTime(sqlTime);
    const time = this.fromDate2TimeString(d);
    return time;
  }

  /**
   * returns Time string to display out of date got from sql
   * @param {*} sqlDate 
   * @returns 
   */
  static fromSqlDate2TimeString(sqlDate) {
    sqlDate = sqlDate.replace(new RegExp("-", "g"), "/");
    const d = new Date(sqlDate);
    const time = this.fromDate2TimeString(d);
    return time;
  }

  /**
   * returns Date string to display out of date got from sql
   * @param {*} sqlDate 
   * @returns 
   */
  static fromSqlDate2DateString(sqlDate) {
    sqlDate = sqlDate.replace(new RegExp("-", "g"), "/");
    const d = new Date(sqlDate);
    const time = this.fromDate2DateString(d);
    return time;
  }
}
