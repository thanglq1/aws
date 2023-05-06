import sharp from "sharp";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// Replace your region
const REGION = "ap-southeast-2";

// Replace your images size (We will resize from source image to 1280x720 and 640x360 resolutions)
const IMAGES_SIZE = [
  {
    width: 1280,
    height: 720,
  },
  {
    width: 640,
    height: 360,
  },
];

// Replace your destination bucket name
const destinationBucketName = "destination-image-bucket-name";

export const handler = async (event, context) => {
  // Get bucket name and file name from event
  const sourceBucketName = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  console.log("sourceBucketName:::", sourceBucketName);
  console.log("key:::", key);

  // Create S3Client and get object information
  const s3Client = new S3Client({ region: REGION });
  const input = {
    Bucket: sourceBucketName,
    Key: key,
  };

  try {
    const getObjectCommand = new GetObjectCommand(input);
    const response = await s3Client.send(getObjectCommand);
    console.log("response:::", response);

    // Convert a ReadableStream to a buffer
    const streamToBuffer = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });

    const fileBuffer = await streamToBuffer(response.Body);
    console.log("fileBuffer:::", fileBuffer);

    const promises = IMAGES_SIZE.map(async (imageSize) => {
      // Resize image
      const resizedImage = await sharp(fileBuffer)
        .resize(imageSize.width, imageSize.height)
        .jpeg({ mozjpeg: true })
        .toBuffer();

      const input = {
        Body: resizedImage,
        Bucket: destinationBucketName,
        Key: `${key}-${imageSize.width}-${imageSize.height}`,
      };

      const putObjectCommand = new PutObjectCommand(input);
      return promises.push(s3Client.send(putObjectCommand));
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error("ERROR:::", error);
  }
};
