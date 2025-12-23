export interface GistContributor {
  name: string;
  avatar: string;
  website: string;
}

export const GIST_CONTRIBUTORS: GistContributor[] = [
  {
    name: "Avi",
    avatar: "/avatar/avatar.png",
    website: "https://avi.byontriq.xyz",
  },
  {
    name: "Jane Smith",
    avatar: "https://avatars.githubusercontent.com/janesmith",
    website: "https://janesmith.com",
  },
];