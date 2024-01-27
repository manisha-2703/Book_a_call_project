
const AWS = require('aws-sdk');

function uploadToS3(data, filename) {
    const BUCKET_NAME = 'expensetracker27';
    const IAM_USER_KEY = 'AKIA2NX6B5KSWTMWWDH3'; // Fix typo in IAM_USER_KEY
    const IAM_USER_SECRET = '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'; // Fix typo in IAM_USER_SECRET

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    });

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read', // Add a comma to separate properties
    };

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something went wrong', err);
                reject(err);
            } else {
                // console.log('success', s3response);
                resolve(s3response.Location);
            }
        });
    });
}

module.exports = uploadToS3;

