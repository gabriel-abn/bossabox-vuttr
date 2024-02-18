import { ApplicationError } from "@application/common";
import { IHasherComparer, ITokenHandler } from "@application/protocols";
import { IUserRepository } from "@application/repositories";
import { Login } from "@domain/use-cases/login";

export class LoginUseCase implements Login {
  constructor(
    private readonly repo: IUserRepository,
    private readonly tokenizer: ITokenHandler,
    private readonly comparer: IHasherComparer,
  ) {}

  async execute(params: Login.Params): Promise<Login.Result> {
    const user = await this.repo.get(params.email);

    if (!user) {
      throw new ApplicationError("User not found");
    }

    const isPasswordValid = await this.comparer.compare(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApplicationError("Invalid password");
    }

    const accessToken = await this.tokenizer.tokenize({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
