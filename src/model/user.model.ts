export default interface UserModel {
  userId: string;
  username: string;
  password: string;
  active: boolean;
  createAt: Date;
  firstName: string;
  lastName: string;
}
