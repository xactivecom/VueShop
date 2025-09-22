// Player tag returned by name search
export interface PlayerTag {
  id: number,
  fullName: string,
  teamName: string,
}

// Player detail
export interface PlayerDetail {
  id: number,
  firstName: string,
  lastName: string,
  dob: string,
  age: number,

  teamName: string,
  jersey: number,
  position: string,
}
