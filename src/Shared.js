export default class Shared {
  static addZeroIfBelow10(x) {
    return x < 10 ? `0${x}` : x;
  }
  static fromSqlTime2TimeString(sqlTime) {
    const d = new Date(`01 Jan 1970 ${sqlTime} GMT`);
    var hours = this.addZeroIfBelow10(d.getHours());
    var minutes = this.addZeroIfBelow10(d.getMinutes());
    const time = `${hours}:${minutes}`;
    return time;
  }


}
