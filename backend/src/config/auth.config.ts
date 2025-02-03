export const authConfig = {
  jwtSecret:
    process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
  jwtExpiresIn: '1d',
};
