const serverless = require('serverless-http');
const AWS = require('aws-sdk');

// Import the existing Express app (ES module default export)
const appModule = require('./index');
const app = appModule.default || appModule;

let secretsInitialized = false;

async function initSecrets() {
  if (secretsInitialized) return;
  secretsInitialized = true;

  const secretId = process.env.SECRETS_ID;
  if (!secretId) {
    return;
  }

  try {
    const client = new AWS.SecretsManager();
    const data = await client.getSecretValue({ SecretId: secretId }).promise();

    let secrets = {};
    if (data.SecretString) {
      try {
        secrets = JSON.parse(data.SecretString);
      } catch (parseError) {
        console.error('Failed to parse secrets JSON from Secrets Manager:', parseError);
        return;
      }
    }

    // Optionally copy secrets into process.env for libraries that rely on env vars
    Object.entries(secrets).forEach(([key, value]) => {
      if (typeof process.env[key] === 'undefined') {
        process.env[key] = String(value);
      }
    });
  } catch (error) {
    // Never let secrets loading break cold start
    console.error('Error loading secrets from Secrets Manager:', error);
  }
}

const handlerProxy = serverless(app);

exports.handler = async (event, context) => {
  await initSecrets();
  return handlerProxy(event, context);
};
