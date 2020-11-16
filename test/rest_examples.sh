#!/bin/bash 

# exported from Insomnia client

# location GET invalid
curl --request GET \
  --url http://localhost:3000/api/locations/1234

# location GET valid
curl --request GET \
  --url http://localhost:3000/api/locations/5f778a7473fff6ece9e14f1e

# location DELETE
curl --request DELETE \
  --url http://localhost:3000/api/locations/5f778a7473fff6ece9e14f1e

# locations GET
curl --request GET \
  --url http://localhost:3000/api/locations

# locations by geo GET valid
curl --request GET \
  --url 'http://localhost:3000/api/locationsbygeo?lng=-0.7992599&lat=51.378091&maxDistance=20000'

# locations by geo GET invalid
curl --request GET \
  --url 'http://localhost:3000/api/locationsbygeo?lng=-71.478610&lat=42.186760&maxDistance=20000'

# location POST
curl --request POST \
  --url http://localhost:3000/api/locations \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'name=Bubble Tea' \
  --data 'address=949 Sky Valley Drive Palm Springs CA' \
  --data 'facilities=Hot drinks,Premium wifi' \
  --data lng=-71.058884 \
  --data lat=42.360081

# location PUT
curl --request PUT \
  --url http://localhost:3000/api/locations/5f1edd81e40e5fb13c63c3b8 \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'name=Starrr Cups'

# location PUT 2
curl --request PUT \
  --url http://localhost:3000/api/locations/5f778a7473fff6ece9e14f1e \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'name=Bubble Tea2'

# reviews POST
curl --request POST \
  --url http://localhost:3000/api/locations/5f1edd81e40e5fb13c63c3b8/reviews \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'author=John Coltrane' \
  --data rating=5 \
  --data reviewText=Meh

# reviews PUT
curl --request PUT \
  --url http://localhost:3000/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/5f1edd81e40e5fb13c63c3b5 \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'author=Simon Holmes III' \
  --data rating=1 \
  --data reviewText=Meh

# reviews DELETE
curl --request DELETE \
  --url http://localhost:3000/api/locations/5f1edd81e40e5fb13c63c3b8/reviews/5f1edd81e40e5fb13c63c3b5
