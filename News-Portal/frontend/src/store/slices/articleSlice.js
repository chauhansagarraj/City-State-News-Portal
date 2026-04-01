import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

const initialState = {
  articles: [],
  article: null,
  allArticles: [],
  loading: false,
  error: null,
  message: null
};


// GET ALL ARTICLES
export const fetchArticles = createAsyncThunk(
  "reader/articles",
  async (page = 1, thunkAPI) => {
    try {
      const res = await API.get(`/reader/articles?page=${page}`);
      return res.data.articles;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchArticlesByCategory = createAsyncThunk(
  "reader/category",
  async (category, thunkAPI) => {
    try {
      const res = await API.get(`/reader/filter?category=${category}`);
      return res.data?.articles;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// GET SINGLE ARTICLE
export const fetchArticleDetails = createAsyncThunk(
  "reader/articleDetails",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/reader/articles/${id}`);
      return res.data.article;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);


// SEARCH ARTICLES
export const searchArticles = createAsyncThunk(
  "reader/search",
  async (query, thunkAPI) => {
    try {
      const res = await API.get(`/reader/search?q=${query}`);
      return res.data.articles;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);


// FILTER ARTICLES
export const filterArticles = createAsyncThunk(
  "reader/filter",
  async (filters, thunkAPI) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await API.get(`/reader/filter?${params}`);
      return res.data.articles;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const toggleLikeArticle = createAsyncThunk(
  "reader/toggleLike",
  async (id, thunkAPI) => {
    try {
      const res = await API.post(`/likes/article/${id}`);
      return { id, ...res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// journalist side 

export const createArticle = createAsyncThunk(
  "/journalist/articles/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/journalist/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create article"
      );
    }
  }
);

/* EDIT ARTICLE */

export const editArticle = createAsyncThunk(
  "/journalist/articles/edit/:id",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/journalist/edit/${id}`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* SUBMIT ARTICLE */

export const submitArticle = createAsyncThunk(
  "journalist/articles/submit",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.put(`/journalist/submit/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticleById = createAsyncThunk(
  "articles/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/journalist/articles/${id}`)
      return res.data.article
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

/* VIEW ARTICLE */

export const viewArticle = createAsyncThunk(
  "articles/view",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/journalist/view/${id}`);
      return res.data.article;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);



const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers:  {
  clearArticleState: (state) => {
    state.message = null
    state.error = null
  }
},

  extraReducers: (builder) => {

    builder

      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
          state.allArticles = action.payload;

      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(fetchArticleDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchArticleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })

      .addCase(fetchArticleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(searchArticles.pending, (state) => {
      state.loading = true;
    })

    .addCase(searchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    })

    .addCase(searchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    // FILTER ARTICLES
    .addCase(filterArticles.pending, (state) => {
      state.loading = true;
    })

    .addCase(filterArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    })

    .addCase(filterArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(fetchArticlesByCategory.pending, (state) => {
  state.loading = true;
})

.addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
  state.loading = false;
  state.articles = action.payload;
})

.addCase(fetchArticlesByCategory.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(toggleLikeArticle.fulfilled, (state, action) => {

  const { id, totalLikes } = action.payload;

  const article = state.articles.find(a => a._id === id);

  if (article) {
    article.likesCount = totalLikes;
  }

  if (state.article && state.article._id === id) {
    state.article.likesCount = totalLikes;
  }

})

.addCase(createArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticle.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;   
  state.message = null;
})
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
        state.message = action.payload.message;
      })
      // .addCase(viewArticle.fulfilled, (state, action) => {
      //   state.article = action.payload;
      // })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.message = action.payload.message;
      })
      // .addCase(editArticle.pending, (state) => {
      //   state.loading = true;
      // })  
      .addCase(editArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(getArticleById.pending,(state)=>{
  state.loading = true
})

.addCase(submitArticle.fulfilled, (state, action) => {
  state.message = action.payload.message;
  state.error = null;
})
.addCase(submitArticle.rejected, (state, action) => {
  state.error = action.payload;   
  state.message = null;
})

.addCase(getArticleById.fulfilled,(state,action)=>{
  state.loading = false
  state.article = action.payload
})
.addCase(getArticleById.rejected,(state,action)=>{
  state.loading = false
  state.error = action.payload
})

.addCase(viewArticle.pending, (state) => {
  state.loading = true;
})
.addCase(viewArticle.fulfilled, (state, action) => {
  state.loading = false;
  state.article = action.payload;
})
.addCase(viewArticle.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message;
});

  },
});

export const { clearArticleState } = articleSlice.actions;
export default articleSlice.reducer;