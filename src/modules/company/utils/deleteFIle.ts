import { EnvConfig } from "src/config";
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { configS3 } from "./s3Config";

const client = configS3;


export const deleteFile = async(url: string) => {
  const key = url.split('/').slice(3).join('/');
  const deleteFileS3 = new DeleteObjectCommand({
    Bucket: EnvConfig.S3.BUCKET,
    Key: key,
  })
  try {
   
    await client.send(deleteFileS3);
 
  } catch (error) {
    throw new Error("Erro ao excluir a imagem: " + error.message);
  }
}