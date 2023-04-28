export default class ApiService {
  static endPoint = "http://192.168.137.206:8000/api";

  static async login(data) {
    const url = this.endPoint + "/account/auth/";
    console.log(url);
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async register(data) {
    const url = this.endPoint + "/account/user/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async getUserParcel(data) {
    // const
  }
}
