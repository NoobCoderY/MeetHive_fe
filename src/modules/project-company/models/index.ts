export interface ICompany {
  id: string;
  name: string;
  description: string;
  website: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface companyApiResponse {
  status: number;
  data: ICompany[];
  error_code: string | null;
  error: string | null;
}

interface IProjectUserRole {
  id: string;
  name: string;
}

export interface IProjectUser {
  id: string;
  user: string;
  role: IProjectUserRole;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  status: string;
  created_by: string;
  updated_by: string | null;
  company: {
    id: string;
    name: string;
  },
  users: IProjectUser[];
  created_at: string;
  updated_at: string;
}

export type IProjects = IProject[];
