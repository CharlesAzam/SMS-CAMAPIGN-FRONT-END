
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { Admin } from './admin';
import { Role } from './Role';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  adminList: Admin[] = [];

  findById(id: string): Observable<Admin> {
    let url = API.BASE_URL + '/cms/cdn/' + id;
    // let params = { "id": id };
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Admin>(url, { headers });
  }


  listRoles(index?, size?): Observable<Admin[]> {
    let url = API.BASE_URL + '/cms/roles';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    if (index || size) {
      let params = {
        "pageNumber": index,
        "size": size
      };
      return this.http.get<any>(url, {  headers })
    }
    return this.http.get<any>(url, { headers })
  }

  listUsers(index?, size?): Observable<Admin[]> {
    let url = API.BASE_URL + '/cms/cms-user/list';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    if (index || size) {
      let params = {
        "pageNumber": index,
        "size": size
      };
      return this.http.get<any>(url, {  headers })
    }
    return this.http.get<any>(url, { headers })
  }

  getModulesAndActions() {
    let url = API.BASE_URL + '/cms/create-role';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers })

  }

  createRole(data: Role) {
    let url = API.BASE_URL + '/cms/create-role';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Role>(url, data, { headers });
  }


  createUser(entity: Admin): Observable<Admin> {
    let url = API.BASE_URL + '/cms/create-cms-user';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Admin>(url, entity, { headers });
  }

  deleteUser(id: string) {
    let url = API.BASE_URL + `/cms/cms-user/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, { headers });
  }

  deleteRole(id: string) {
    let url = API.BASE_URL + `/cms/roles/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, { headers });
  }


  update(data: any) {
    let url = API.BASE_URL + `/cms/cdn/${data._id}/update`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, data, { headers });
  }

  getRolePermission (roleName: string){
    
    let url = API.BASE_URL + `/cms/list-role-permisson/${roleName}`;
    console.log("Role Name from get role oermission "+roleName)
    console.log("URL" +url)
    return this.http.get(url);
  }

  getModulePermission (moduleName: string){
    let url = API.BASE_URL + `/cms/get-module-permission/${moduleName}`;
    console.log("Role Name from get role oermission "+moduleName)
    console.log("URL" +url)
    return this.http.get(url);
  }

  getCount() {
    let url = API.BASE_URL + `/cms/count/cdn`;
    return this.http.get(url);
  }

}

