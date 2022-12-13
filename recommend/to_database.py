from random_username.generate import generate_username
import pandas as pd

MIN_ID = 1
MAX_ID = 200

RATINGS_COLUMN = ['user_id','movie_id','rating','timestamp']

def createUsers():
  id_data = [ i for i in range(MIN_ID, MAX_ID + 1 ) ]
  name_data = generate_username(MAX_ID)
  user_data = {'id': id_data, 'name':name_data}

  users = pd.DataFrame(data=user_data)

  users.to_csv('./to_database/user_to_database.csv',sep=',',na_rep='NaN',index=False)

  print('created users')

def createRatings():
  ratings = pd.read_csv('./data/ratings.csv',header=None,names=RATINGS_COLUMN)
  ratings.to_csv('./to_database/rating_to_database.csv',sep=',',na_rep='NaN',index=True)

  print('created ratings')

def createWatching():
  ratings = pd.read_csv('./data/ratings.csv', header=None,names=RATINGS_COLUMN)
  ratings['timestamp'] = ratings['timestamp'].apply(lambda str: int(str) - 1)

  ratings.to_csv('./to_database/watching_to_database.csv',sep=',',na_rep='NaN',index=True)

  print('create watching')

if __name__ == '__main__':
  createUsers()
  createRatings()
  # createWatching()

  
