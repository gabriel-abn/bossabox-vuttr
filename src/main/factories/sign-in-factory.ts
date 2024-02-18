import { SignUpUseCase } from "@application/use-cases";
import jwtHandler from "@infra/authentication/jwt-handler";
import crypter from "@infra/crypter/crypter";
import userRepository from "@infra/storage/user-repository";
import { SignUpController } from "@presentation/controllers/sign-up-controller";

export class SignUpFactory {
  static make() {
    const useCase = new SignUpUseCase(jwtHandler, userRepository, crypter);
    const controller = new SignUpController(useCase);

    return controller;
  }
}
