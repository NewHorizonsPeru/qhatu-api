import boom from "@hapi/boom";
import UserDto from "../dtos/user.dto";
import { hashText } from "../util/bcrypt.util";
import { generateUuid } from "../util/fake.data";

class UserService {
  users: UserDto[];
  constructor() {
    this.users = [
      {
        username: "srdelarosab@gmail.com",
        firstName: "Renato",
        lastName: "De la Rosa",
        password:
          "$2b$10$Q0dCdlxi9cB6cN5nN3XhZeBc0IYa.GpqtcjD89akGfXYwlJyBvWc2",
        role: "ADMIN",
        id: "f418623b-c9fc-4738-9058-a796a0d07a19",
      },
    ];
  }
  getAll(): Promise<UserDto[]> {
    return new Promise((resolve) => resolve(this.users));
  }
  async getById(userId: string): Promise<UserDto> {
    const user = this.users.find((p) => p.id === userId);
    if (!user) {
      throw boom.notFound("user not found 😔");
    }

    return user;
  }
  async getByUsername(username: string): Promise<UserDto> {
    const user = this.users.find((p) => p.username === username);
    if (!user) {
      throw boom.notFound("user not found 😔");
    }
    return user;
  }
  async add(userToAdd: UserDto): Promise<UserDto> {
    const user = this.users.find((p) => p.username === userToAdd.username);
    if (user) {
      throw boom.notFound("user current exists 😔");
    }
    userToAdd.id = generateUuid();
    userToAdd.password = await hashText(userToAdd.password);
    this.users.push(userToAdd);
    return userToAdd;
  }
  async update(userId: string, userToUpdate: UserDto): Promise<UserDto> {
    const index = this.users.findIndex((p) => p.id === userId);
    if (index === -1) {
      throw boom.notFound("user not found 😔");
    }
    const user = this.users[index];
    const userUpdated = {
      ...user,
      ...userToUpdate,
    };
    this.users[index] = userUpdated;

    return userUpdated;
  }
  async remove(userId: string): Promise<{}> {
    const index = this.users.findIndex((p) => p.id === userId);
    if (index === -1) {
      throw new Error("user not found 😔");
    }
    this.users.splice(index, 1);
    return { userId, success: true };
  }
}

export default UserService;
