
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class ArticleInput {
    title: string;
    paragraphs: string[];
    active?: boolean;
    img?: string;
}

export class ArticleSectionInput {
    title: string;
}

export class ArticleSectionUpdateInput {
    id: string;
    title?: string;
    articles?: ArticleUpdateInput[];
}

export class ArticleUpdateInput {
    id: string;
    title?: string;
    paragraphs?: ParagraphUpdateInput[];
    active?: boolean;
    img?: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class ParagraphUpdateInput {
    id: string;
    body: string;
}

export class PostInput {
    title: string;
    body?: string;
    active?: boolean;
}

export class SignUpInput {
    email: string;
    password: string;
}

export class Article {
    id: string;
    title: string;
    paragraphs: Paragraph[];
    active: boolean;
    img?: string;
    section?: ArticleSection;
}

export class ArticleSection {
    id: string;
    title: string;
    articles: Article[];
}

export class AuthPayload {
    id: string;
    email: string;
}

export abstract class IMutation {
    abstract signup(signUpInput?: SignUpInput): AuthPayload | Promise<AuthPayload>;

    abstract login(loginInput?: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract createPost(postInput?: PostInput): Post | Promise<Post>;

    abstract createArticle(articleInput?: ArticleInput): Article | Promise<Article>;

    abstract updateArticle(articleUpdateInput?: ArticleUpdateInput): Article | Promise<Article>;

    abstract createArticleSection(articleSectionInput?: ArticleSectionInput): ArticleSection | Promise<ArticleSection>;

    abstract updateArticleSection(articleSectionUpdateInput?: ArticleSectionUpdateInput): ArticleSection | Promise<ArticleSection>;
}

export class Paragraph {
    id: string;
    body: string;
    article: Article;
}

export class Post {
    id: string;
    title: string;
    body?: string;
    author: User;
    active: boolean;
}

export abstract class IQuery {
    abstract post(id: string): Post | Promise<Post>;

    abstract posts(): Post[] | Promise<Post[]>;

    abstract myPosts(): Post[] | Promise<Post[]>;

    abstract articles(): Article[] | Promise<Article[]>;

    abstract articleSections(): ArticleSection[] | Promise<ArticleSection[]>;

    abstract article(id: string): Article | Promise<Article>;
}

export class User {
    id: string;
    email: string;
    post: Post[];
    createdAt: string;
    updatedAt: string;
}
