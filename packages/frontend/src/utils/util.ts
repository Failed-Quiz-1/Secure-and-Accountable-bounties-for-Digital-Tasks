export function getUserId(): number {
  const userid = parseInt(localStorage.getItem("userid")!);
  return userid;
}

export function getUsername(): string {
  const username = localStorage.getItem("username")!;
  return username;
}

export function setUser(userid: number, username: string) {
  localStorage.setItem("userid", userid.toString());
  localStorage.setItem("username", username.toString());
}

export function removeUser() {
  localStorage.removeItem("userid");
  localStorage.removeItem("username");
}

export function chunk(arr: any, chunkSize: any): any {
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}
