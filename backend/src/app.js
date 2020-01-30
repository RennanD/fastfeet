import express from "express";

import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.routes();
    this.middlewares();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(express.json());
  }
}

export default new App().server;
