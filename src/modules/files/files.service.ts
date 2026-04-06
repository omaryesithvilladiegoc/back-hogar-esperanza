import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService {
  async getImagesByFolder(folder: string) {
    try {
      const result = await cloudinary.search
        .expression(`asset_folder="${folder}"`)
        .max_results(500)
        .execute();

      const resultImages = result.resources.map((file) => ({
        id: file.asset_id,
        public_id: file.public_id,
        url: file.secure_url,
        width: file.width,
        height: file.height,
        format: file.format,
        created_at: file.created_at,
        bytes: file.bytes,
        folder: file.asset_folder,
      }));
      const urls = resultImages.map((file) => file.url);
      return urls;
    } catch (error) {
      throw new Error(
        `Error fetching images from folder ${folder}: ${error.message}`,
      );
    }
  }
}
