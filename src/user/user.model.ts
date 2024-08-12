
import { Column, Model, Table, PrimaryKey, HasMany, CreatedAt, UpdatedAt, ForeignKey, Unique, AllowNull } from 'sequelize-typescript';
import { Post } from '../post/post.model';

@Table
export class User extends Model {

@AllowNull(false)
@Unique
@Column
email!: string;


@HasMany(() => Post)
posts: Post[];

}

