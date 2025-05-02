export default () => ({
    upload: {
        config: {
          provider: 'local',
          providerOptions: {
            sizeLimit: 250 * 1024 * 1024, // 250MB in bytes
            localServer: {
              maxage: 300000 // Cache control
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
          breakpoints: {
            xlarge: 1920,
            large: 1000,
            medium: 750,
            small: 500,
            xsmall: 64
          }
        }
      },
      'strapi-plugin-populate-deep': {
        config: {
          defaultDepth: 5, // Default is 5
        }
      },
});
