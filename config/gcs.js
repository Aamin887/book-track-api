const { Storage } = require("@google-cloud/storage");

const keyFilename = "books.json";
const projectId = process.env.GCS_PROJECT_ID;
const bucketName = process.env.GCS_BUCKET_NAME;

const gcsStorage = new Storage({
  projectId,
  keyFilename,
});

const gcsBucket = gcsStorage.bucket(bucketName);

module.exports = gcsBucket;