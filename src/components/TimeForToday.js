export const TimeForToday = (timestamp) => {
  // 글 올린 시간부터 현재까지의 시간 계산해주는 함수 
  // timestamp = 각 data.time  가져옴
  const pstTime = timestamp * 1000;
  const todayTime = new Date().getTime();
  const betweenTime = Math.floor((todayTime - pstTime) / 1000 / 60);

  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime} minutes ago`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour} hours ago`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay} days ago`;
  }

  return `${Math.floor(betweenTimeDay / 365)} years ago`;
};
