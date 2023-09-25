import { Tool, ToolProps } from "@domain/entities";
import { faker } from "@faker-js/faker";

export const mockTool = (mock?: Partial<ToolProps>) =>
  Tool.create({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    link: faker.internet.url(),
    tags: [faker.commerce.productMaterial(), faker.commerce.productMaterial()],
    ...mock,
  });
