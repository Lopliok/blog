import { Column, Model, Table, PrimaryKey, HasMany, AllowNull, HasOne, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Post extends Model {
  @Column
  title: string;

  @AllowNull(true)
  @Column
  body?: string;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @Default(true)
  @Column
  active: boolean;
}


