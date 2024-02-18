import { LoginUseCase } from "@application/use-cases/login-use-case";
import jwtHandler from "@infra/authentication/jwt-handler";
import crypter from "@infra/crypter/crypter";
import userRepository from "@infra/storage/user-repository";
import { LoginController } from "@presentation/controllers/login-controller";

export class LoginFactory {
  static make() {
    const useCase = new LoginUseCase(userRepository, jwtHandler, crypter);
    const controller = new LoginController(useCase);

    return controller;
  }
}
