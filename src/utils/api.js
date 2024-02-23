// api.js
const LOCATIONIQ_API_KEY = 'pk.fc5bdca3e0176d50ca5bf172e3c8f77d';

export const getPlaceDetails = async (place) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
        place
      )}&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      console.log(data)
      return {
        details: data[0],
        coordinates: {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        },
      };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

export const getNearbyTouristAttractions = async (coordinates) => {
  try {
    const { lat, lon } = coordinates;
    const response = await fetch(
      `https://us1.locationiq.com/v1/nearby.php?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&tag=tourism&radius=1000&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      // Assuming the response structure has a list of nearby places with 'name' and 'coordinates' properties
      const attractions = data.map((attraction) => ({
        name: attraction.display_name,
        coordinates: {
          lat: parseFloat(attraction.lat),
          lon: parseFloat(attraction.lon),
        },
      }));

      return attractions;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching nearby tourist attractions:", error);
    throw error;
  }
};
