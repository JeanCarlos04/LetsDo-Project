import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const multerConfig = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, "../../uploads"),
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  }),
});

export default multerConfig;
