export default class ApiService {
  static endPoint = "http://192.168.194.86:8000/api";
  // static endPoint = "http://192.168.1.136:8000/api";

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
      body: data,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async updatePassword(data, token) {
    const url = this.endPoint + "/account/update-password/";
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async resetPassword(data, token) {
    const url = this.endPoint + "/account/reset-password/";
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async getUser(token) {
    const url = this.endPoint + "/account/user/";
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async updateUser(id, data, token) {
    const url = this.endPoint + `/account/user/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  static async getCultures(token) {
    const url = this.endPoint + "/core/culture/";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getPopularCultures(token) {
    const url = this.endPoint + "/core/culture/populars";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getRecommendedCultures(token) {
    const url = this.endPoint + "/core/culture/recommended";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getCulture(id, token) {
    const url = this.endPoint + `/core/culture/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
  static async getCultureDisease(id, token) {
    const url = this.endPoint + `/core/culture/${id}/diseases/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
  static async getCultureFavorableAreas(id, token) {
    const url = this.endPoint + `/core/culture/${id}/favorable_areas/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
  static async getCultureFertilizers(id, token) {
    const url = this.endPoint + `/core/culture/${id}/fertilizers/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getCulturePractise(id, token) {
    const url = this.endPoint + `/core/culture/${id}/practise/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getFertilizers(token) {
    const url = this.endPoint + `/core/fertilizer/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getFertilizer(id, token) {
    const url = this.endPoint + `/core/fertilizer/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getUserParcels(token) {
    const url = this.endPoint + `/core/parcel/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async createUserParcel(data, token) {
    const url = this.endPoint + "/core/parcel/";
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getUserParcel(id, token) {
    const url = this.endPoint + `/core/parcel/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async deleteParcel(id, token) {
    const url = this.endPoint + `/core/parcel/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async addCulturesToParcel(parcelId, data, token) {
    /**
     * Here the data must be a a json.strigify with value
     * {
     *  ids:[<cultures id_1>,<cultures id_2>,...,<cultures id_n>]
     * }
     */
    const url = this.endPoint + `/core/parcel/${parcelId}/add_cultures/`;
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async suggestCulturesToParcel(parcelId, token) {
    const url = this.endPoint + `/core/parcel/${parcelId}/suggest_culture/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getSoils(token) {
    const url = this.endPoint + `/core/soil/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
  static async getSoil(id, token) {
    const url = this.endPoint + `/core/soil/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
  static async getAreasOfSoil(soildId, token) {
    const url = this.endPoint + `/core/soil/${soildId}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getSoilAreas(token) {
    const url = this.endPoint + `/core/soil_area/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getSoilArea(id, token) {
    const url = this.endPoint + `/core/soil_area/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  // Forum

  static async getForums() {
    const url = this.endPoint + `/forum/forum/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getForum(id) {
    const url = this.endPoint + `/forum/forum/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async updateForum(id, data) {
    const url = this.endPoint + `/forum/forum/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async updateForum(id) {
    const url = this.endPoint + `/forum/forum/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getForumPost() {
    const url = this.endPoint + `/forum/forum-post/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getForumPost(id) {
    const url = this.endPoint + `/forum/forum-post/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async getForumPost(id) {
    const url = this.endPoint + `/forum/forum-post/${id}/`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async updateForumPost(id, data) {
    const url = this.endPoint + `/forum/forum-post/${id}/`;
    const res = await fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
  static async deleteForumPost(id) {
    const url = this.endPoint + `/forum/forum-post/${id}/`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async createForumPostComment(data, token) {
    const url = this.endPoint + `/forum/forum-post-comment/`;
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  static async search(key, value, token) {
    const url = this.endPoint + `/core/search/?${key}=${value}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }
}


// export default class ApiService {
//   static endPoint = "http://192.168.137.206:8000/api";

//   static async login(data) {
//     const url = this.endPoint + "/account/auth/";
//     console.log(url);
//     const res = await fetch(url, {
//       method: "POST",
//       body: data,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return res;
//   }

//   static async register(data) {
//     const url = this.endPoint + "/account/user/";
//     const res = await fetch(url, {
//       method: "POST",
//       body: data,

//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return res;
//   }

//   static async getUserParcel(data) {
//     // const
//   }

//   static async saveUserParcel(data, token) {
//     const url = this.endPoint + "/core/parcel/";
//     const res = await fetch(url, {
//       method: "POST",
//       body: data,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//     });
//     return res;
//   }
// }
