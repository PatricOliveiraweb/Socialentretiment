export interface IPost {
  id: string;
  title: string;
  id_tag: string;
  id_user: string;
  content?: string;
  image?: string;
}

export interface IComent {
  id?: string;
  id_user: string;
  id_post: string;
  content: string;
}

export interface INewPost {
  title: string;
  id_tag: string;
  id_user: string;
  content?: string;
}
