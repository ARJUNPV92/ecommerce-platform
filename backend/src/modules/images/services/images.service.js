const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const repo = require('../repositories/images.repository');
const audit = require('../../../common/audit/audit.service')

class ImagesService {
    async createThumbnail(originalPath, targetPath) {
        await sharp(originalPath)
            .resize(300, 300)
            .jpeg({ quality: 80 })
            .toFile(targetPath);
    }

    async upload(file, body, user) {
        const originalPath = file.path;

        const thumbDir = body.variantId
            ? 'uploads/variants/thumbnails'
            : 'uploads/products/thumbnails';

        if (!fs.existsSync(thumbDir)) {
            fs.mkdirSync(thumbDir, { recursive: true });
        }

        const thumbPath = path.join(
            thumbDir,
            path.basename(originalPath)
        );

        await this.createThumbnail(originalPath, thumbPath);

        const record = await repo.save({
            productId: body.productId,
            variantId: body.variantId,
            filePath: '/' + originalPath,
            thumbnailPath: '/' + thumbPath,
            isPrimary: body.isPrimary
        });

        await audit.log({
            userId: user.id,
            action: 'UPLOAD_IMAGE',
            entity: 'image',
            entityId: record.id
        });

        return record;
    }

    async listProductImages(productId) {
        return repo.listByProduct(productId);
    }
}

module.exports = new ImagesService();
