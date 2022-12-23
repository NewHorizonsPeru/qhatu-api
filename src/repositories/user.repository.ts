import UserModel from "../models/user.model";

export default class UserRepository {
  async getAll() {
    const users = await UserModel.find();
    return users;
  }
  async getById(userId: string) {
    const user = await UserModel.findById(userId);
    return user;
  }
  async getByUsername(username: string) {
    const user = await UserModel.findOne({ username: username });
    return user;
  }
  async add(userModelToAdd: any) {
    const userModel = await userModelToAdd.save();
    return userModel;
  }
  async update(userModelToUpdate: any, userId: string) {
    const userModel = await UserModel.findByIdAndUpdate(
      userId,
      userModelToUpdate,
      { new: true }
    );
    return userModel;
  }
  async remove(userId: string) {
    const userRemove = await UserModel.findByIdAndDelete(userId);
    return userRemove;
  }
}
