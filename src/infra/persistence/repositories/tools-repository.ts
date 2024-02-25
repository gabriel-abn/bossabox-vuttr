import {
  CheckByTitleAndLinkRepository,
  IToolRepository,
} from "@application/repositories";
import { Tool } from "@domain/entities";
import { IListDatabase, IRelationalDatabase, RepositoryError } from "../common";
import postgres from "../database/postgres";

class ToolsRepository
  implements IToolRepository, CheckByTitleAndLinkRepository
{
  private readonly relational: IRelationalDatabase;
  private readonly list: IListDatabase;

  constructor() {
    this.relational = postgres;
  }

  async check(title: string, link: string): Promise<boolean> {
    const rows = await this.relational.query(
      `
      SELECT *
      FROM tools
      WHERE title = $1 AND link = $2
      `,
      [title, link],
    );

    if (rows.length === 0) {
      return false;
    }

    return true;
  }

  async save(tool: Tool): Promise<void> {
    try {
      const props = {
        ...tool.props,
        id: tool.id,
        createdAt: tool.createdAt,
        updatedAt: tool.updatedAt,
      };

      const exists = await this.check(props.title, props.link);

      if (exists) {
        throw new RepositoryError("ToolsRepository", "Tool already exists");
      }

      await this.relational.execute(
        `
        INSERT INTO tools (id, title, link, description, tags, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          props.id,
          props.title,
          props.link,
          props.description,
          props.tags,
          props.createdAt,
          props.updatedAt,
        ],
      );
    } catch (error) {
      throw new RepositoryError("ToolsRepository.save", error);
    }
  }

  async getAll(): Promise<Tool[]> {
    try {
      const tools = await this.relational.query(
        `
        SELECT *, created_at as "createdAt", updated_at as "updatedAt"
        FROM tools
        `,
      );

      if (tools.length === 0) {
        return [];
      }

      return tools.map((tool) =>
        Tool.restore(
          {
            title: tool.title,
            link: tool.link,
            description: tool.description,
            tags: tool.tags,
          },
          tool.id,
          tool.createdAt,
          tool.updatedAt,
        ),
      );
    } catch (error) {
      throw new RepositoryError("ToolsRepository.getAll", error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.relational.execute(
        `
        DELETE FROM tools
        WHERE id = $1;
        `,
        [id],
      );

      return result;
    } catch (error) {
      throw new RepositoryError("ToolsRepository.delete", error);
    }
  }

  async get(filter: {
    id?: string;
    title?: string;
    tags?: string[];
  }): Promise<Tool[]> {
    const { id, title, tags } = filter;
    const tool: Tool[] = [];

    try {
      if (id) {
        const rows = await this.relational.query(
          `
          SELECT *, created_at as "createdAt", updated_at as "updatedAt"
          FROM tools
          WHERE id = $1
          `,
          [id],
        );

        if (rows.length === 0) {
          return [];
        }

        rows.forEach((row) => {
          tool.push(
            Tool.restore(
              {
                title: row.title,
                link: row.link,
                description: row.description,
                tags: row.tags,
              },
              row.id,
              row.createdAt,
              row.updatedAt,
            ),
          );
        });

        return tool;
      }

      if (title) {
        const rows = await this.relational.query(
          `
          SELECT *, created_at as "createdAt", updated_at as "updatedAt"
          FROM tools
          WHERE title LIKE $1
          `,
          [`%${title}%`],
        );

        if (rows.length === 0) {
          return [];
        }

        rows.forEach((row) => {
          tool.push(
            Tool.restore(
              {
                title: row.title,
                link: row.link,
                description: row.description,
                tags: row.tags,
              },
              row.id,
              row.createdAt,
              row.updatedAt,
            ),
          );
        });

        return tool;
      }

      if (tags) {
        const storedTags = (await this.list.getList("tags")).filter((tag) =>
          tags.includes(tag),
        );

        const ids = new Set<string>();

        for (const tag of storedTags) {
          const tools = await this.list.getList(tag);

          tools.forEach((id) => ids.add(id));
        }

        const rows = await this.relational.query(
          `
          SELECT *, created_at as "createdAt", updated_at as "updatedAt"
          FROM tools
          WHERE id @> $1
          `,
          [Array.from(ids)],
        );

        if (rows.length === 0) {
          return [];
        }

        rows.forEach((row) => {
          tool.push(
            Tool.restore(
              {
                title: row.title,
                link: row.link,
                description: row.description,
                tags: row.tags,
              },
              row.id,
              row.createdAt,
              row.updatedAt,
            ),
          );
        });

        return tool;
      }
    } catch (error) {
      throw new RepositoryError("ToolsRepository.get", error);
    }
  }

  async update(id: string, tool: Tool): Promise<void> {
    try {
      const props = {
        ...tool.props,
        id: tool.id,
        createdAt: tool.createdAt,
        updatedAt: tool.updatedAt,
      };

      await this.relational.execute(
        `
        UPDATE tools
        SET title = $1, link = $2, description = $3, tags = $4, updated_at = $5
        WHERE id = $6
        `,
        [
          props.title,
          props.link,
          props.description,
          props.tags,
          props.updatedAt,
          props.id,
        ],
      );
    } catch (error) {
      throw new RepositoryError("ToolsRepository.update", error);
    }
  }
}

export default new ToolsRepository();
