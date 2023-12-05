import api from "../../api/apiSlice";

const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        url: `/team`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getAllTeam: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/team?searchTerm=${searchTerm}&limit=${limit}&page=${page}`,
      }),
      providesTags: ["user"],
    }),

    getSingleTeam: builder.query({
      query: ({ id }) => ({
        url: `/team/${id}`,
      }),
      providesTags: ["user"],
    }),

    deleteSingleTeam: builder.mutation({
      query: ({ id }) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetAllTeamQuery,
  useGetSingleTeamQuery,
  useDeleteSingleTeamMutation,
} = teamApi;
