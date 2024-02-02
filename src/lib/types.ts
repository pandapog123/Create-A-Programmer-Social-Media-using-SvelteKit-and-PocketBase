export type User = {
  id: string;
  email?: string;
  name: string;
  photo?: string;
  bio?: string;
};

export function validateUser(data: any): data is User {
  const idIsString = typeof data.id === "string";
  const nameIsString = typeof data.name === "string";

  return idIsString && nameIsString;
}

export type Post = {
  title: string;
  created: string;
  content: string;
  tags: string[];
  likes: string[];
  user: User;
  language: string;
};

export function validatePost(data: any): data is Post {
  const titleIsString = typeof data.title === "string";
  const createdIsString = typeof data.created === "string";
  const contentIsString = typeof data.content === "string";
  const languageIsString = typeof data.language === "string";
  const userIsValid = validateUser(data.user);
  const tags = data.tags;
  const tagsIsValid =
    Array.isArray(tags) &&
    tags.length > 0 &&
    tags.reduce<boolean>(
      (prev, cur) => (prev ? typeof cur === "string" : prev),
      true
    );
  const likes = data.likes;
  const likesIsValid =
    Array.isArray(likes) &&
    likes.reduce<boolean>(
      (prev, cur) => (prev ? typeof cur === "string" : prev),
      true
    );

  return (
    titleIsString &&
    createdIsString &&
    contentIsString &&
    languageIsString &&
    userIsValid &&
    tagsIsValid &&
    likesIsValid
  );
}
