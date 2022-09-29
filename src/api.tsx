import { IComent, INewPost, IPost } from "./Interfaces/Interfaces";

export const API_URL = "http://localhost:3333";

export function TOKEN_POST(body: Object) {
  return {
    url: API_URL + "/sessions/",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function POST_GET() {
  return {
    url: API_URL + "/posts/",
    options: {
      method: "GET",
    },
  };
}

export function TOKEN_VALIDATE(token: string, id: string) {
  return {
    url: API_URL + "/users/validate/" + JSON.parse(id),
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_USER_BY_ID(id: string) {
  return {
    url: API_URL + "/users/" + JSON.parse(id),
    options: {
      method: "GET",
    },
  };
}

export function POST_GET_BY_USER(token: string, id: string) {
  return {
    url: API_URL + "/posts/user/" + JSON.parse(id),
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function POST_GET_BY_ID(id: string) {
  return {
    url: API_URL + "/posts/" + id,
    options: {
      method: "GET",
    },
  };
}

export function GET_COMENT(id: string) {
  return {
    url: API_URL + "/coments/" + id,
    options: {
      method: "GET",
    },
  };
}

export function POST_COMENT(comment: IComent, token: string) {
  return {
    url: API_URL + "/coments",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(comment),
    },
  };
}

export function POST(Data: INewPost, token: string) {
  return {
    url: API_URL + "/posts",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(Data),
    },
  };
}

export function PHOTO_POST(id: string, formData: FormData, token: string) {
  return {
    url: API_URL + "/posts/" + id + "/image",
    options: {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
}

interface IResponsePhoto {
  page: number;
  total: number;
  user?: number;
}

export function COMMENT_POST(id: number, body: object, token: string) {
  return {
    url: `${API_URL}/api/comment/${id}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function POST_DELETE(id: string, token: string) {
  return {
    url: `${API_URL}/posts/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  };
}
