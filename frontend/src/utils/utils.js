function isTokenExpired(token) {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const currentTime = Date.now() / 1000; // Current time in seconds
    return exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error("Error checking token expiration", error);
    return true; // Treat any error as an expired token
  }
}

export default isTokenExpired;
