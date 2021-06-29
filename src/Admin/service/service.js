import http from "../service/hhtp-common";

class Service {
  getConAll() {
    return http.get("/admin/");
  }

  getPresAll() {
    return http.get("/admin/presentation/all/");
  }
  
  get(id) {
    return http.get(`/admin/${id}`);
  }

  update(id, data) {
    return http.put(`/admin/${id}`, data);
  }

//   delete(id) {
//     return http.delete(`/about/${id}`);
//   }

//   findByBrand(brand) {
//     return http.get(`/product?brand=${brand}`);
//   }

  getAprroved() {
    return http.get(`/admin/approved/one`);
  }

}

export default new Service();