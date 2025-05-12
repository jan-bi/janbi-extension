export default class UrlModel {
  constructor({
    _id,
    name,
    url,
    dayOfWeek,
    scheduleTime,
    selectors = [],
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = _id;
    this.name = name;
    this.url = url;
    this.dayOfWeek = dayOfWeek;
    this.scheduleTime = scheduleTime;
    this.selectors = selectors;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getSelectorCount() {
    return this.selectors.length;
  }

  getFormattedSchedule() {
    return `${this.dayOfWeek} ${this.scheduleTime}`;
  }

  toJSON() {
    return {
      _id: this.id,
      name: this.name,
      url: this.url,
      dayOfWeek: this.dayOfWeek,
      scheduleTime: this.scheduleTime,
      selectors: this.selectors,
    };
  }
}
