import { S3Client } from '@aws-sdk/client-s3';
import { EnvConfig } from "src/config";


export const configS3 = new S3Client({
  region: EnvConfig.S3.REGION, 
  credentials: {
    accessKeyId: EnvConfig.S3.ACCESS_KEY_ID, 
    secretAccessKey: EnvConfig.S3.SECRET_ACCESS_KEY, 
  },
})
