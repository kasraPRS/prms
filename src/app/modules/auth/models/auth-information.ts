export interface AuthInformation {
  nbf: number,
  exp: number,
  iat: number,
  name: string,
  nameid: string,
  role: "admin" | "rm" | "dm" | "level3" | "level4" | "level5",
}