import boom from "@hapi/boom";
import UserDto from "../dtos/user.dto";
import UserModel from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import { hashText } from "../util/bcrypt.util";

class UserService {
  private readonly userRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAll(): Promise<UserDto[]> {
    let usersDto: UserDto[] = [];
    const usersModel = await this.userRepository.getAll();
    usersModel.map((u) =>
      usersDto.push({
        id: u.id,
        username: u.username!,
        firstName: u.firstName!,
        lastName: u.lastName!,
        role: u.role!,
      })
    );
    return usersDto;
  }
  async getById(userId: string): Promise<UserDto> {
    const userModel = await this.userRepository.getById(userId);
    if (!userModel) {
      throw boom.notFound("user not found 😔");
    }

    const UserDto: UserDto = {
      id: userModel.id,
      username: userModel.username!,
      firstName: userModel.firstName!,
      lastName: userModel.lastName!,
      role: userModel.role!,
    };
    return UserDto;
  }

  async getByUsername(username: string): Promise<UserDto> {
    const userModel = await this.userRepository.getByUsername(username);
    if (!userModel) {
      throw boom.notFound("user not found 😔");
    }

    const UserDto: UserDto = {
      id: userModel.id,
      username: userModel.username!,
      firstName: userModel.firstName!,
      lastName: userModel.lastName!,
      role: userModel.role!,
      password: userModel.password!,
    };
    return UserDto;
  }

  async add(userDtoToAdd: UserDto): Promise<UserDto> {
    const userModel = new UserModel({
      username: userDtoToAdd.username!,
      firstName: userDtoToAdd.firstName!,
      lastName: userDtoToAdd.lastName!,
      role: userDtoToAdd.role!,
      password: await hashText(userDtoToAdd.password!),
    });
    const newUserModel = await this.userRepository.add(userModel);
    userDtoToAdd.id = newUserModel.id;
    userDtoToAdd.password = "";
    return userDtoToAdd;
  }
  async update(userId: string, userDtoToUpdate: UserDto): Promise<UserDto> {
    const userModel = await this.userRepository.update(userDtoToUpdate, userId);
    const UserDto: UserDto = {
      id: userModel?.id,
      username: userModel?.username!,
      firstName: userModel?.firstName!,
      lastName: userModel?.lastName!,
      role: userModel?.role!,
    };
    return UserDto;
  }
  async remove(userId: string): Promise<UserDto> {
    const userModel = await this.userRepository.remove(userId);
    let UserDto: UserDto = {
      id: userModel?.id,
      username: userModel?.username!,
      firstName: userModel?.firstName!,
      lastName: userModel?.lastName!,
      role: userModel?.role!,
    };
    return UserDto;
  }
}

export default UserService;
