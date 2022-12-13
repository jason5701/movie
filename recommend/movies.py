import numpy as np
import sys
import pandas as pd
from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
pd.set_option('display.max_columns',None) # 전체 열 출력하기

path = 'd:/test/movie/recommend/data'
credits_df = pd.read_csv(path+'/tmdb_5000_credits.csv')
movies_df = pd.read_csv(path+'/tmdb_5000_movies.csv')

credits_df.columns = ['id','title','cast','crew']
movies_df = movies_df.merge(credits_df, on=["id",'title'])

# print(movies_df.head())

# build the movie recommender -----------------------------------
features = ['cast','crew','keywords','genres']

for feature in features:
  movies_df[feature] = movies_df[feature].apply(literal_eval)

# print(movies_df[features].head(10))

def get_director(x):
  for i in x:
      if i["job"] == "Director":
          return i["name"]
  return np.nan

def get_list(x):
    if isinstance(x, list):
        names = [i["name"] for i in x]

        if len(names) > 3:
            names = names[:3]

        return names

    return []

movies_df['director'] = movies_df['crew'].apply(get_director)

features = ['cast','keywords','genres']
for feature in features:
  movies_df[feature] = movies_df[feature].apply(get_list)

# print(movies_df[['title', 'cast', 'director', 'keywords', 'genres']].head())

def clean_data(row):
  if isinstance(row, list):
    return [str.lower(i.replace(" ", "")) for i in row]
  else:
    if isinstance(row, str):
      return str.lower(row.replace(' ',''))
    else:
      return ''

features=['cast','keywords','director','genres']
for feature in features:
  movies_df[feature] = movies_df[feature].apply(clean_data)

def create_soup(features):
  return ' '.join(features['keywords'])+' '+ ' '.join(features['cast'])+' '+features['director']+ ' '+' '.join(features['genres'])

movies_df['soup']=movies_df.apply(create_soup, axis=1)
# print(movies_df['soup'].head())

count_vectorizer = CountVectorizer(stop_words='english')
count_matrix = count_vectorizer.fit_transform(movies_df['soup'])
# print(count_matrix.shape)

cosine_sim = cosine_similarity(count_matrix, count_matrix)
# print(cosine_sim.shape)

movies_df = movies_df.reset_index()
indices = pd.Series(movies_df.index, index=movies_df['title']).drop_duplicates()

# get recommendations for the movies ---------------------------
def get_recommendations(title, cosine_sim=cosine_sim):
  idx=indices[title]
  sim_scores = list(enumerate(cosine_sim[idx]))
  sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
  sim_scores = sim_scores[1:11]
  # (a, b) where a is id of movie, b is similarity_scores

  movies_indices = [ind[0] for ind in sim_scores]
  # movies = movies_df['title'].iloc[movies_indices]


  # return movies
  return movies_indices

# print("################ Content Based System #############")
# print("Recommendations for " + sys.argv[1])
print(get_recommendations(sys.argv[1]))
# print()
# print("Recommendations for Avengers")
# print(get_recommendations("The Notebook", cosine_sim))
# print('----------------')
print(sys.argv[1])

# if __name__=='__main__':
#   get_recommendations(sys.argv[1])