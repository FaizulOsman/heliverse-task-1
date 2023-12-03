import api from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    insertData: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getAllData: builder.query({
      query: ({
        limit,
        page,
        sortOrder,
        searchTerm,
        filterBy,
        filterOrder,
      }) => ({
        url: `/users?searchTerm=${searchTerm}&limit=${limit}&page=${page}&sortOrder=${sortOrder}&${
          filterBy && filterOrder && `${filterBy}=${filterOrder}`
        }`,
      }),
      providesTags: ["user"],
    }),

    getSingleData: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["user"],
    }),

    deleteSingleData: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    updateSingleData: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useInsertDataMutation,
  useGetAllDataQuery,
  useGetSingleDataQuery,
  useDeleteSingleDataMutation,
  useUpdateSingleDataMutation,
} = userApi;
