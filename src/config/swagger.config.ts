import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const definitions: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Qhatu API",
    description:
      "Irure cupidatat dolor minim consequat consequat irure ea irure eiusmod mollit quis.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:2705/api/v1",
      description: "Node A",
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
      CategoryDto: {
        type: "object",
        required: ["id", "name"],
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
            require: true,
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
