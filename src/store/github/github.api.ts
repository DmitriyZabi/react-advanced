import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRepo, IServerResponse, IUser } from '../../models/models'

export const gitHubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: IServerResponse) => response.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
        params: {
          per_page: 10,
        },
      }),
    }),
  }),
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = gitHubApi
