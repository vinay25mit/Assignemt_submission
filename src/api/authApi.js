export const loginApi = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.username === "admin" &&
        credentials.password === "admin123"
      ) {
        resolve({ token: "mock-jwt-token-123" });
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000); 
  });
};