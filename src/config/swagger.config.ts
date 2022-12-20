import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const definitions: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Qhatu API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:2705",
      description: "Node A",
    },
    {
      url: "http://localhost:2792",
      description: "Node B",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      user: {
        type: "object",
        required: ["email", "password", "firstName", "lastName"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
    },
  },
};

const options: OAS3Options = {
  swaggerDefinition: definitions,
  apis: ["./src/controllers/*.ts"],
};

export default swaggerJSDoc(options);
