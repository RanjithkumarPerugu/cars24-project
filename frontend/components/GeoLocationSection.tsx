const detectLocation = () => {
  if (!navigator.geolocation) {
    setLocationStatus(
      "Geolocation is not supported by your browser."
    );
    return;
  }

  setLocationStatus("Detecting your location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // Temporary prototype city detection
      let detectedCity = "";

      // ==========================================
      // CHENNAI APPROXIMATE COORDINATES
      // Expanded range to include nearby locations
      // ==========================================

      if (
        latitude > 12.7 &&
        latitude < 13.4 &&
        longitude > 79.7 &&
        longitude < 80.5
      ) {
        detectedCity = "Chennai";
      }

      // ==========================================
      // HYDERABAD APPROXIMATE COORDINATES
      // ==========================================

      else if (
        latitude > 17.0 &&
        latitude < 17.7 &&
        longitude > 78.0 &&
        longitude < 78.8
      ) {
        detectedCity = "Hyderabad";
      }

      // ==========================================
      // BANGALORE APPROXIMATE COORDINATES
      // ==========================================

      else if (
        latitude > 12.7 &&
        latitude < 13.3 &&
        longitude > 77.3 &&
        longitude < 77.9
      ) {
        detectedCity = "Bangalore";
      }

      // ==========================================
      // MUMBAI APPROXIMATE COORDINATES
      // ==========================================

      else if (
        latitude > 18.7 &&
        latitude < 19.4 &&
        longitude > 72.6 &&
        longitude < 73.2
      ) {
        detectedCity = "Mumbai";
      }

      // ==========================================
      // DELHI APPROXIMATE COORDINATES
      // ==========================================

      else if (
        latitude > 28.3 &&
        latitude < 28.9 &&
        longitude > 76.8 &&
        longitude < 77.5
      ) {
        detectedCity = "Delhi";
      }

      // ==========================================
      // LOCATION FOUND
      // ==========================================

      if (detectedCity) {
        console.log("Detected City:", detectedCity);

        setSelectedCity(detectedCity);

        setLocationStatus(
          `Location detected: ${detectedCity}`
        );

        fetchCarsByCity(detectedCity);
      } else {
        setLocationStatus(
          `Location found (${latitude.toFixed(
            4
          )}, ${longitude.toFixed(
            4
          )}), but city is not available in our demo list.`
        );
      }
    },

    // ==========================================
    // LOCATION ERROR HANDLING
    // ==========================================

    (error) => {
      console.error("Location error:", error);

      if (error.code === 1) {
        setLocationStatus(
          "Location permission denied. Please allow location access in browser."
        );
      } else if (error.code === 2) {
        setLocationStatus(
          "Location unavailable. Turn on Windows Location Services."
        );
      } else if (error.code === 3) {
        setLocationStatus(
          "Location request timed out. Please try again."
        );
      } else {
        setLocationStatus(
          "City could not be detected. Please select manually."
        );
      }
    },

    // ==========================================
    // GEOLOCATION SETTINGS
    // ==========================================

    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};