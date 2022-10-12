var AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.NODE_APP_AWS_ACCESSKEYID,
  secretAccessKey: process.env.NODE_APP_AWS_SECRETACCESSKEY,
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

async function saveImage(buf, Key, ext, folder) {
  return new Promise(async (resolve) => {
    try {
      const uploadURL = await s3
        .upload({
          Bucket: process.env.NODE_APP_AWS_S3_BUCKET_NAME,
          Key: `${folder}/${Key}`,
          Body: buf,
          ContentType: `image/${ext}`,
        })
        .promise();
    //   console.log("uploadURL", uploadURL);
      delete uploadURL.key;
      delete uploadURL.ETag;
      resolve(uploadURL);
    } catch (err) {
      console.log("S3 File Save ERR", err);
    }
  });
}

module.exports.saveImages = async (photos, title, folder) => {
  if (!photos)
    //null or undefined
    photos = [];
  else if (typeof photos === "string") {
    //single image
    photos = [photos];
  }
  return new Promise((resolve) => {
    let promises = [];
    photos.forEach((photo) => {
      const data = photo.replace(/^data:image\/\w+;base64,/, "");
      const extension = photo.split(";base64")[0].replace("data:image/", "");
      const name = title.replace(/\s+/, "_").slice(0, 20);
      const Key = `${name}_${Date.now()}_${getRandomIntInclusive(
        1,
        1000000
      )}.${extension}`;
      const buf = Buffer.from(data, "base64");
      const saved = saveImage(buf, Key, extension, folder);
      promises.push(saved);
    });
    Promise.all(promises).then((result) => {
    //   console.log(result, "result");
      resolve(result);
    });
  });
};

module.exports.deleteImages = function (images) {
  images.forEach((each) =>
    s3Client.deleteObject(
      {
        Bucket: each.Bucket,
        Key: each.Key,
      },
      (err, data) => {
        if (err)
          console.log(
            "DELETING S3 IMAGE, WHEN ERR WHILE ADDING PLANT",
            err,
            data
          );
      }
    )
  );
};
