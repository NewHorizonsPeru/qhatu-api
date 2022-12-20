type Role = "ADMIN" | "CUSTOMER" | "INVENTORY";
export default interface UserDto {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  token?: string;
}
