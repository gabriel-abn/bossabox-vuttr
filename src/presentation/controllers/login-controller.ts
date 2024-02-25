import { Login } from "@domain/use-cases";
import { HttpRequest } from "@presentation/common";
import Controller from "@presentation/common/controller";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z.string().min(8, { message: "Invalid password." }),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export class LoginController extends Controller<LoginRequest> {
  constructor(private readonly useCase: Login) {
    super(loginSchema);
  }

  async run(
    request: HttpRequest<LoginRequest>,
  ): Promise<{ accessToken: string }> {
    const { email, password } = request.data;

    const result = await this.useCase.execute({ email, password });

    return result;
  }
}
