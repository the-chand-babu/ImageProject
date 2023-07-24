## image Project..

it is normal image project where first user will login signup , and after that user can acces the favourite or home routes , in home routes user can see all the image , in favourite only user can see specific image whatever he added in favourite..

## to start server ..

# npm start

routes for signup ...

http://localhost:4000/signup -- send body = { name, email , password},

http://localhost:4000/login -- body {email,password},

# all the routes pass token in headers ..

http://localhost:4000/getImages/page number -- get request

-- send token in headers.Authorization == token, in this routes u have to also pass

the page , because it will return only 10 image , because of pagination..

http://localhost:4000/favourite/page number -- get 10 favourite image ... -- method get

# post

http://localhost:4000/favourite/product \_id...

# delete

http://localhost:4000/favourite/product \_id...
