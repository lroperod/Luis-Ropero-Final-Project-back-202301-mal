import { RequestHandler } from 'express';
import {
  supabase,
  TRAVEL_BUCKET_NAME,
} from '../../database/supabase-client.js';
import log from '../../logger.js';

export const supabaseMiddleware: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  { email: string; picture: string }
> = async (req, res, next) => {
  const { email } = res.locals;
  const fileBuffer = req.file?.buffer;
  let travelPicture;

  if (fileBuffer !== undefined) {
    const fileName = `${email}${Date.now()}`;
    const { error } = await supabase.storage
      .from(TRAVEL_BUCKET_NAME)
      .upload(fileName, fileBuffer);

    if (error === null) {
      const { data } = supabase.storage
        .from(TRAVEL_BUCKET_NAME)
        .getPublicUrl(fileName);
      travelPicture = data.publicUrl;
      log.info('Public URL generated', data.publicUrl);

      res.locals.picture = travelPicture;
      log.info(res.locals.picture);
    }
  }

  next();
};
