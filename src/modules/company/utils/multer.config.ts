import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { configS3 } from './s3Config';
import { EnvConfig } from "src/config";


const multerConfig ={
    storage: multerS3({
      s3: configS3,
      bucket: EnvConfig.S3.BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: EnvConfig.S3.ACL,
      key:(req, file, cb) => {
        const fileName = 
         path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();
         const extension = path.parse(file.originalname).ext;
         cb(null, `${fileName}${extension}`);
        },
      }),
    };

export default multerConfig;