
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ArticleSectionInput {
    title: string;
}

export class ArticleSectionUpdateInput {
    id: string;
    title?: Nullable<string>;
    active?: Nullable<boolean>;
    advanced?: Nullable<boolean>;
    deleted?: Nullable<boolean>;
    articles?: Nullable<Nullable<ArticleUpdateInput>[]>;
}

export class SignUpInput {
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PostInput {
    title: string;
    body?: Nullable<string>;
    active?: Nullable<boolean>;
}

export class ParagraphUpdateInput {
    id: string;
    deleted?: Nullable<boolean>;
    body?: Nullable<string>;
}

export class ArticleInput {
    title: string;
    paragraphs: string[];
    active?: Nullable<boolean>;
    section?: Nullable<string>;
    advanced?: Nullable<boolean>;
    img?: Nullable<string>;
}

export class ArticleUpdateInput {
    id: string;
    title?: Nullable<string>;
    paragraphs?: Nullable<ParagraphUpdateInput[]>;
    newParagraphs?: Nullable<string[]>;
    advanced?: Nullable<boolean>;
    deleted?: Nullable<boolean>;
    active?: Nullable<boolean>;
    img?: Nullable<string>;
}

export class User {
    id: string;
    email: string;
    post: Post[];
    createdAt: string;
    updatedAt: string;
}

export class Post {
    id: string;
    title: string;
    body?: Nullable<string>;
    author: User;
    active: boolean;
}

export class Article {
    id: string;
    title: string;
    paragraphs: Paragraph[];
    active: boolean;
    advanced: boolean;
    deleted: boolean;
    img?: Nullable<string>;
    section?: Nullable<ArticleSection>;
}

export class ArticleSection {
    id: string;
    title: string;
    active: boolean;
    advanced: boolean;
    deleted: boolean;
    articles: Nullable<Article>[];
}

export class Paragraph {
    id: string;
    body: string;
    deleted: boolean;
    article: Article;
}

export class AuthPayload {
    id: string;
    email: string;
}

export abstract class IQuery {
    abstract post(id: string): Post | Promise<Post>;

    abstract posts(): Post[] | Promise<Post[]>;

    abstract myPosts(): Post[] | Promise<Post[]>;

    abstract articles(): Article[] | Promise<Article[]>;

    abstract articleSections(): ArticleSection[] | Promise<ArticleSection[]>;

    abstract article(id: string): Nullable<Article> | Promise<Nullable<Article>>;
}

export abstract class IMutation {
    abstract signup(signUpInput?: Nullable<SignUpInput>): AuthPayload | Promise<AuthPayload>;

    abstract login(loginInput?: Nullable<LoginInput>): AuthPayload | Promise<AuthPayload>;

    abstract createPost(postInput?: Nullable<PostInput>): Post | Promise<Post>;

    abstract createArticle(articleInput?: Nullable<ArticleInput>): Article | Promise<Article>;

    abstract updateArticle(articleUpdateInput?: Nullable<ArticleUpdateInput>): Article | Promise<Article>;

    abstract createArticleSection(articleSectionInput?: Nullable<ArticleSectionInput>): ArticleSection | Promise<ArticleSection>;

    abstract updateArticleSection(articleSectionUpdateInput?: Nullable<ArticleSectionUpdateInput>): ArticleSection | Promise<ArticleSection>;
}

type Nullable<T> = T | null;
