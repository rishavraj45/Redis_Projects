do we keep user's profile in redis.? YES, one of the major thing in production.
We store it in cache, but how.?
=> 2 ways :- 1. Simply in JSON, 2. In Hash


redis functions / command:-

set -> store single variable
hset -> store object
hgetall -> like getting / retrieving entire object

hget -> get single object
hdel -> to delete
hexists -> field is available in memory or not.?