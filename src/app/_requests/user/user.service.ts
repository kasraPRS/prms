import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel, UserType } from '../../modules/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpParamsService } from '../../_services/http-params.service';
import { PaginationModel as Pagination } from '../../_modules/table-pagination/table-pagination.component';
import {
  User_generateUserByLink_body,
  User_getAllListDTO,
  User_getAllUsersDTO,
  User_getAllUsersIdAndNameDTO,
  User_GetParentUsersDTO,
  User_GetSubUsersDTO,
  User_isUserInParents,
  User_isUserParentOrChild,
  User_loginDTO,
  User_updateProfile_body,
} from './userModel';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private readonly baseUrl: string = environment.apiUrl + 'User/';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User_loginDTO> {
    return this.http.post<User_loginDTO>(this.baseUrl + 'login', {
      email,
      password,
    });
  }
  loginVerifiacationCode(
    code: number,
    userId: number
  ): Observable<User_loginDTO> {
    return this.http.post<User_loginDTO>(
      this.baseUrl + 'LoginVerifiacationCode',
      { loginVerficationCodeDto: { code, userId } }
    );
  }

  changePassword(body: {
    currentPassword: string;
    newPassword: string;
  }): Observable<{}> {
    return this.http.put<{}>(this.baseUrl + 'ChangePassword', body);
  }
  resetPassword(body: {
    resetPasswordInfo: string;
    newPassword: string;
  }): Observable<{}> {
    return this.http.put<{}>(this.baseUrl + 'ResetPassword', body);
  }
  resetPasswordByAdmin(body: { userId: number }): Observable<{}> {
    return this.http.put<{}>(this.baseUrl + 'ResetPasswordByAdmin', body);
  }
  sendResetPasswordInfoToEmail(body: {
    email: string | null;
    userId: number | null;
  }): Observable<{}> {
    return this.http.put<{}>(
      this.baseUrl + 'SendResetPasswordInfoToEmail',
      body
    );
  }

  validatePhoneNumber(body: { code: number }): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + 'ValidatePhoneNumber', body);
  }
  addOrUpdateMobile(body: { mobile: string }): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + 'AddOrUpdateMobile', body);
  }
  sendCodeToPhoneNumber(): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + 'SendCodeToPhoneNumber', {});
  }

  disableTwoStepVerification(): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + 'DisableTwoStepVerification', {
      userId: 0,
    });
  }

  getUserById(id: string | number): Observable<UserType> {
    return this.http.get<UserType>(`${this.baseUrl}GetUser/${id}`);
  }

  generateUserByLink(body: User_generateUserByLink_body): Observable<any> {
    return this.http.post(this.baseUrl + 'GenerateUserByLink', body, {
      responseType: 'text',
    });
  }
  updateProfile(body: User_updateProfile_body): Observable<any> {
    return this.http.post<UserModel>(this.baseUrl + 'UpdateProfile', body);
  }

  isUserInParents(params: {
    UserId?: number,
    CheckingUserId?: number
  }): Observable<User_isUserInParents> {
    return this.http.get<User_isUserInParents>(
      this.baseUrl + 'IsUserInParents',
      { params: HttpParamsService.ExtractionParams(params) }
    );
  }
  isUserParentOrChild(params: {
    UserId?: number,
    CheckingUserId?: number
  }): Observable<User_isUserParentOrChild> {
    return this.http.get<User_isUserParentOrChild>(
      this.baseUrl + 'IsUserParentOrChild',
      { params: HttpParamsService.ExtractionParams(params) }
    );
  }
  

  getAllUsers(params: {
    Name: string | null;
    Email: string | null;
    IncludeAdmin: boolean | null;
    PageNumber: number | null;
    PageSize: number | null;
    UserName: string | null;
    RoleName: string | null;
    UserCategoryIds: string | null;
    Gender: string | null;
  }): Observable<Pagination<User_getAllUsersDTO[]>> {
    return this.http.get<Pagination<User_getAllUsersDTO[]>>(
      `${this.baseUrl}GetAllUsers`,
      { params: HttpParamsService.ExtractionParams(params) }
    );
  }
  getAllUsersIdAndName(params: {
    Name?: string | null;
    Email?: string | null;
    UserName?: string | null;
    RoleName?: string | null;
    UserCategoryIds?: string | null;
    Gender?: string | null;
    IncludeAdmin?: boolean | null;
    PageNumber?: number | null;
    PageSize?: number | null;
  }): Observable<Pagination<User_getAllUsersIdAndNameDTO[]>> {
    return this.http.get<Pagination<User_getAllUsersIdAndNameDTO[]>>(
      `${this.baseUrl}GetAllUsersIdAndName`,
      { params: HttpParamsService.ExtractionParams(params) }
    );
  }
  getAllUsers1(): Observable<User_getAllUsersDTO> {
    return this.http.get<User_getAllUsersDTO>(this.baseUrl + 'GetAllUsers');
  }
  searchInUsers(params: { Name: string }): Observable<User_getAllUsersDTO> {
    return this.http.get<User_getAllUsersDTO>(this.baseUrl + 'GetAllUsers', {
      params: HttpParamsService.ExtractionParams(params),
    });
  }

  GetSubUsers(params: {
    Name?: string | null;
    Email?: string | null;
    UserName?: string | null;
    RoleName?: string | null;
    UserCategoryIds?: string | null;
    Gender?: string | null;
    IncludeAdmin?: boolean | null;
    PageNumber?: number | null;
    PageSize?: number | null;
    userId: number;
  }): Observable<Pagination<User_GetSubUsersDTO[]>> {
    return this.http.get<Pagination<User_GetSubUsersDTO[]>>(
      `${this.baseUrl}GetSubUsers`,
      { params: HttpParamsService.ExtractionParams(params) }
    );
  }
  GetParentUsers(params: {
    userId: number;
  }): Observable<Pagination<User_GetParentUsersDTO[]>> {
    return this.http.get<Pagination<User_GetParentUsersDTO[]>>(
      `${this.baseUrl}GetParentUsers`,
      { params: HttpParamsService.ExtractionParams(params) }
    );
  }
  // implemented without pagination
  getAllList(): Observable<User_getAllListDTO[]> {
    return this.http.get<User_getAllListDTO[]>(this.baseUrl + 'getAllList');
  }
  // implemented without pagination
  getAllUserList(): Observable<User_getAllUsersDTO[]> {
    const url = this.baseUrl + 'getAllList';
    const rat = this.http.get<User_getAllUsersDTO[]>(url);
    return rat;
  }
}
