import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NgmCode {
  public static getCode(data: any) { return btoa(data.toString()); }
  public static getDecode(data: any) { return atob(data.toString()); }
}