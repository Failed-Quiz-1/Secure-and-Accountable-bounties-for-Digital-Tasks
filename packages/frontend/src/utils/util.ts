export function getUserId(): number {
  const userid = parseInt(localStorage.getItem("userid")!);
  return userid;
}

export function setUserId(userid: number) {
  localStorage.setItem("userid", userid.toString());
}

export function getCurrentDateString() {
  const currentdate = new Date();
  const datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
}
