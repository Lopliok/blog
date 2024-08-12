import { Sequelize } from 'sequelize-typescript';
import { Cat } from '../cat/cat.entity';
import { User } from '../user/user.model';
import { Post } from '../post/post.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'example',
        database: 'postgres',
      });
      sequelize.addModels([Cat, User, Post]);
      await sequelize.sync();
      return sequelize;
    },
  },
]

