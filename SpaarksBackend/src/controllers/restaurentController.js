const Restaurant = require("../models/Restaurent");
const calculateDistance = require("../utils/calculateDistance");



exports.createRestaurant = async (req, res) => {
    console.log("eee")
    try {
    const { name, description, location ,ratings } = req.body;
    const {latitude,longitude} = location
    console.log(latitude)

    if (!name || !description || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required: name, description, latitude, longitude' });
      }
      if (ratings && !Array.isArray(ratings)) {
        return res.status(400).json({ error: 'Ratings must be an array' });
      }

        const restaurant = await Restaurant.create({
            name,
            description,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude] // GeoJSON format: [longitude, latitude]
            },
            ratings: ratings || []  // Initialize with provided ratings or an empty array
        });
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


//update restaurent
exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params; // Get the restaurant ID from the request parameters
        const { name, description, location, ratings } = req.body;

        const updateFields = {};

        // Add fields to update if they are provided
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (location && location.latitude && location.longitude) {
            updateFields.location = {
                type: 'Point',
                coordinates: [location.longitude, location.latitude] // GeoJSON format
            };
        }
        if (ratings && Array.isArray(ratings)) updateFields.ratings = ratings;

        // Find the restaurant by ID and update it
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.status(200).json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


//get restarent by radius

exports.getRestaurantsByRadius = async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.body;

        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ error: 'All fields are required: latitude, longitude, radius' });
        }

        // Convert radius to radians (radius of Earth is approximately 6378.1 km)
        const radiusInRadians = radius / 6378100; // Convert meters to radians

        const restaurants = await Restaurant.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radiusInRadians]
                }
            }
        }).sort({
            'location.coordinates': 1 // Sort by distance (nearest to farthest)
        });

        // Format the response
        const response = restaurants.map(restaurant => ({
            name: restaurant.name,
            description: restaurant.description,
            location: {
                latitude: restaurant.location.coordinates[1],
                longitude: restaurant.location.coordinates[0]
            },
            averageRating: restaurant.ratings.length ? (restaurant.ratings.reduce((a, b) => a + b, 0) / restaurant.ratings.length).toFixed(2) : 0,
            numberOfRatings: restaurant.ratings.length
        }));

        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



//get restaurent by range range>0
exports.getRestaurantsByRange = async (req, res) => {
    console.log("fff")
    try {
        const { latitude, longitude, minimumDistance, maximumDistance } = req.body;

        if (!latitude || !longitude || !minimumDistance || !maximumDistance) {
            return res.status(400).json({ error: 'All fields are required: latitude, longitude, minimumDistance, maximumDistance' });
        }

        // Convert distances to radians
        const minDistanceInRadians = minimumDistance / 6378100; // Convert meters to radians
        const maxDistanceInRadians = maximumDistance / 6378100; // Convert meters to radians

       
        const restaurants = await Restaurant.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [longitude, latitude], 
                        maxDistanceInRadians
                    ]
                }
            }
        });

        // Filter out restaurants that are closer than the minimum distance
        const filteredRestaurants = restaurants.filter(restaurant => {
            const [lng, lat] = restaurant.location.coordinates;
            const distance = calculateDistance(latitude, longitude, lat, lng); // Utility function to calculate distance between two points using Haversine formula

            return distance >= minimumDistance && distance <= maximumDistance;
        });

        // Format the response
        const response = restaurants.map(restaurant => ({
            name: restaurant.name,
            description: restaurant.description,
            location: {
                latitude: restaurant.location.coordinates[1],
                longitude: restaurant.location.coordinates[0]
            },
            averageRating: restaurant.ratings.length ? (restaurant.ratings.reduce((a, b) => a + b, 0) / restaurant.ratings.length).toFixed(2) : 0,
            numberOfRatings: restaurant.ratings.length
        }));

        res.status(200).json(response);


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




