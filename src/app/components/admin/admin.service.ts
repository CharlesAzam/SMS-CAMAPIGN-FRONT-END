
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment }from 'src/environments/environment';
import { Admin } from './admin';
import { Role } from './Role';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  adminList: Admin[] = [];

  findById(id: string): Observable<Admin> {
    let url = environment.apiUrl + '/cms/cdn/' + id;
    // let params = { "id": id };
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Admin>(url, { headers });
  }


  listRoles(index?, size?): Observable<Admin[]> {
    let url = environment.apiUrl + '/cms/roles';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    if (index || size) {
      let params = {
        "pageNumber": index,
        "size": size
      };
      return this.http.get<any>(url, { headers })
    }
    return this.http.get<any>(url, { headers })
  }

  listUsers(index?, size?): Observable<Admin[]> {
    let url = environment.apiUrl + '/cms/cms-user/list';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    if (index || size) {
      let params = {
        "pageNumber": index,
        "size": size
      };
      return this.http.get<any>(url, { headers })
    }
    return this.http.get<any>(url, { headers })
  }

  getModulesAndActions() {
    let url = environment.apiUrl + '/cms/create-role';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers })

  }

  createRole(data: Role) {
    let url = environment.apiUrl + '/cms/create-role';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Role>(url, data, { headers });
  }


  createUser(entity: Admin): Observable<Admin> {
    let url = environment.apiUrl + '/cms/create-cms-user';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Admin>(url, entity, { headers });
  }

  deleteUser(id: string) {
    let url = environment.apiUrl + `/cms/cms-user/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, { headers });
  }

  deleteRole(id: string) {
    let url = environment.apiUrl + `/cms/roles/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, { headers });
  }


  update(data: any) {
    let url = environment.apiUrl + `/cms/cdn/${data._id}/update`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, data, { headers });
  }

  getRolePermission(roleName: string) {

    let url = environment.apiUrl + `/cms/list-role-permisson/${roleName}`;

    return this.http.get(url);
  }

  getModulePermission(moduleName: string) {
    // console.log("Role Name from get role oermission "+moduleName)
    let url = environment.apiUrl + `/cms/get-module-permission/${moduleName}`;

    return this.http.get(url);
  }

  RemoveSingleModule(roleName, moduleName) {
    // console.log("Role Name from get role oermission "+moduleName)
    let url = environment.apiUrl + `/cms/role-name-remove-module/${roleName}/${moduleName}`;

    return this.http.get(url);
  }

  AddSingleModule(roleName, moduleName, actions) {
    // console.log("Role Name from get role oermission "+moduleName)
    let url = environment.apiUrl + `/cms/role-name-add-module-actions/${roleName}/${moduleName}/${actions}`;

    return this.http.get(url);
  }

  updateSinglePermission(roleName, moduleName, action) {
    let url = environment.apiUrl + `/cms/role-name-assign-module-permission/${roleName}/${moduleName}/${action}`;

    return this.http.get(url);

  }

  deleteSinglePermission(roleName, moduleName, action) {
    let url = environment.apiUrl + `/cms/role-name-delete-module-permission/${roleName}/${moduleName}/${action}`;

    return this.http.get(url);

  }

  UpdateRoleName(oldRoleName, newRoleName) {
    let url = environment.apiUrl + `/cms/update-role-name/${oldRoleName}/${newRoleName}`;

    return this.http.get(url);

  }

  UpdateUserDetail(userId, data) {
    console.log(data)
    let url = environment.apiUrl + `/cms/edit-user/${userId}`;

    return this.http.post(url, data);
  }

  getCount() {
    let url = environment.apiUrl + `/cms/count/cdn`;
    return this.http.get(url);
  }

}

