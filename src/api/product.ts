import { IProduct } from "@/interfaces/product"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void> ({
      query: () => `/products`,
      providesTags: ['Products']
    }),
    getProductsById: builder.query<IProduct, number | string> ({
      query: (id) => `/products/${id}`,
      providesTags: ['Products']
    }),
    addProduct: builder.mutation<IProduct, IProduct> ({
      query: (product) => ({
        url : `/products`,
        method: "POST",
        body: product
      }),
      invalidatesTags: ['Products']
    }),
    editProduct: builder.mutation<IProduct, IProduct> ({
      query: (product) => ({
        url : `/products/${product.id}`,
        method: "PUT",
        body: product
      }),
      invalidatesTags: ['Products']
    }),
    removeProduct: builder.mutation<IProduct,  number | string> ({
      query: (id) => ({
        url : `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Products']
    })
  })
})
export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useEditProductMutation,
  useAddProductMutation,
  useRemoveProductMutation
} = productApi;

export const productsReducer = productApi.reducer
export default productApi