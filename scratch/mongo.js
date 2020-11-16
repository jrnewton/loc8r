db.locations.aggregate([
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [-0.7992599, 51.378091] },
      distanceField: 'distance.calculated',
      spherical: true,
      maxDistance: 20
    }
  }
]);

db.locations.aggregate([
  {
    $geoNear: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [-0.7992599, 51.378091]
        }
      },
      distanceField: 'distance.calculated',
      spherical: true,
      maxDistance: 20
    }
  }
]);
