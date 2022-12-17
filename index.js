class Cal {
  constructor(divId) {
    const d = new Date();
    this.divId = divId;
    this.DaysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
    this.Months = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень"
    ];
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
  }

  nextMonth = () => {
    // if december => next january
    if (this.currMonth === 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    this.showCurr();
  };
  previousMonth = () => {
    // if january => previous december
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    this.showCurr();
  };
  showCurr = () => {
    this.showMonth(this.currYear, this.currMonth);
  };
  showMonth = (y, m) => {
    // get 7-th day = previous months last day, getDay => + 1
    const firstDayOfMonth = new Date(y, m, 7).getDay();
    // get first day of next month, getDay => - 1
    const lastDateOfMonth = new Date(y, m + 1, 0).getDate();
    const lastDayOfLastMonth = m === 0
      ? new Date(y - 1, 11, 0).getDate()
      : new Date(y, m, 0).getDate();
    // start of table
    let html = `
      <table>
      <thead><tr>
      <td colspan='7'>${this.Months[m]} ${y}</td>
      </tr></thead>
      <tr class='days'>
    `;
    // days of week names row
    for (let i = 0; i < this.DaysOfWeek.length; i++) {
      html += "<td>" + this.DaysOfWeek[i] + "</td>";
    }
    html += "</tr>";
    for (let dayOfMonth = 1; dayOfMonth <= lastDateOfMonth; dayOfMonth++) {
      let dayOfWeek = new Date(y, m, dayOfMonth).getDay();
      // new week row
      if (dayOfWeek === 1) {
        html += "<tr>";
      }
      // new month row
      if (dayOfMonth === 1) {
        html += "<tr>";
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          html += "<td class='not-current'>" + k + "</td>";
          k++;
        }
      }
      const chk = new Date();
      const chkY = chk.getFullYear();
      const chkM = chk.getMonth();
      // show current day
      if (chkY === this.currYear && chkM === this.currMonth && dayOfMonth === this.currDay) {
        html += "<td class='today'>" + dayOfMonth + "</td>";
      } else {
        html += "<td>" + dayOfMonth + "</td>";
      }
      // close week row
      if (dayOfWeek === 0) {
        html += "</tr>";
      }
      // close month row
      if (dayOfMonth === lastDateOfMonth) {
        let k = 1;
        for (dayOfWeek; dayOfWeek < 7; dayOfWeek++) {
          html += "<td class='not-current'>" + k + "</td>";
          k++;
        }
      }
    }
    // end of table
    html += "</table>";
    document.getElementById(this.divId).innerHTML = html;
  };
}

window.onload = () => {
  const c = new Cal("divCal");
  c.showCurr();
  document.getElementById("btnNext").onclick = () => {
    c.nextMonth();
  };
  document.getElementById("btnPrev").onclick = () => {
    c.previousMonth();
  };
}