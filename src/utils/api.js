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

