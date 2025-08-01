let IS_PROD = true; // Production mode flag

const server = IS_PROD
  ? "https://echomeet-backend-3o3s.onrender.com"  // ✅ Production URL
  : "http://localhost:8000"; // ⛔ Development URL (यहां local dev server)

export default server;
export { IS_PROD, server };

export const getServerUrl = () => {
  return server;
};
