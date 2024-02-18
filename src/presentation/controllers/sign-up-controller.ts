import { SignUp } from "@domain/use-cases";
import { ok } from "@presentation/common";
import Controller from "@presentation/common/controller";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.",
    ),
});

export type SignUpRequest = z.infer<typeof signUpSchema>;

export class SignUpController extends Controller<SignUpRequest> {
  constructor(private readonly signIn: SignUp) {
    super(signUpSchema);
  }

  async run(request: { email?: string; password?: string }): Promise<any> {
    const { email, password } = request;

    const { accessToken } = await this.signIn.execute({ email, password });

    return ok({ accessToken }, 201);
  }
}
