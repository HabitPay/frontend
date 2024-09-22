/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "frontend",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: process.env.AWS_REGION,
        },
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        return {
          stage: "production",
        };
      },
    },
  },
  async run() {
    new sst.aws.Nextjs("Habitpayfrontend", {
      domain: "habitpay.link",
    });
  },
});
