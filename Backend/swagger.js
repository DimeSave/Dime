import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dime Api",
      version: "1.0.0",
      description: "Describes all the available  APIs on the Dime App",
    },
  },
  // Path to your route files
  apis: ["src/routes/v1/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
