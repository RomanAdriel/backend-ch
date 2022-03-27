import App from './app.js';

// Vars
const PORT = 8081;

(async () => {
  try {
    const server = new App(PORT)
    await server.listen()
    await server.start()
  } catch (error) {
    console.log(`error ${error}`)
  }
})()

