let IS_PROD = false;

const server = IS_PROD
  ? "http://localhost:8000"  // ✅ Production URL (या Render/Heroku का URL)
  : "http://localhost:8000"; // ⛔ यहां dev URL देना है (अभी दोनों same हैं)

export default server;
export { IS_PROD, server };

export const getServerUrl = () => {
  return server;
};