module.exports = {
  //判断字符串为空
  judgeNull(string) {
    for (let item of string.split('')) {
      if (item !== " ") {
        return true;
      }
    }
  },
  //判断是否为qq号码
  judgeQQ(string) {
    const qqReg = /^[1-9][0-9]{4,9}$/gim;
    if (qqReg.test(string)) {
      return true;
    }
  },
  //判断是否为电话号码
  judgePhoneNumber(string) {
    const phoneNumberReg = /^1(3|4|5|7|8|9)\d{9}$/;
    if (phoneNumberReg.test(string)) {
      return true;
    }
  },
  //判断是否为邮箱
  judgeEmail(string) {
    const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (emailReg.test(string)) {
      return true;
    }
  },
  //时间戳转日期
  getDate(time, onOff) {
    function judge(number) {
      return date[number]() < 10 ? `0${date[number]()}` : date[number]();
    }
    const date = new Date(time);
    const month = Number(judge('getMonth')) + 1;
    const transfromDate1 = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`;
    const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`;
    return onOff ? transfromDate2 : transfromDate1;

  },
  //距离某天的剩余时间
  getTimeRemaining(time) {
    const dayTime = 1000 * 60 * 60 * 24;
    const day = Math.floor(time / dayTime);
    const hour = ((time - day * dayTime) / 1000 / 60 / 60).toFixed(0);
    return `${day} 天 ${hour} 小时`;
  },

}