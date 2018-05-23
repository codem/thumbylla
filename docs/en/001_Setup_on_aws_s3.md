# Setup on AWS S3

S3 is a great choice for result storage and/or storage, allowing you to store generated thumbnails outside a Silverstripe website's assets directory.

You will need to install the [Thumbor Community AWS extension](https://github.com/thumbor-community/aws) which can be done via PIP:
```
sudo pip install tc_aws
```

The AWS extension supports an S3 Loading bucket, a storage bucket and a result storage bucket.

S3 communications [are handled via boto](http://boto3.readthedocs.io/en/latest/guide/configuration.html) and your AWS credentials can be stored in the standard places, such as ~/.aws/credentials:
```
[default]
aws_secret_access_key=xxxxxxxxxxxxxxxxxxxxx
aws_access_key_id=aaaaaaaaaaaaaaaaaaa
```

## Sample setup

If you load images from multiple locations but want to store them within your AWS S3 buckets, a good setup options is the following:
### Example thumbor.conf
```
# load images using the HTTP loader
LOADER = 'thumbor.loaders.http_loader'
# store images in S3 storage
STORAGE = 'tc_aws.storages.s3_storage
# store thumbnails in S3 storage
RESULT_STORAGE = 'tc_aws.result_storages.s3_storage'
# your aws region
TC_AWS_REGION = 'ap-southeast-2'

# storage bucket
TC_AWS_STORAGE_BUCKET='storage.bucket.name' # S3 bucket for storage
TC_AWS_STORAGE_ROOT_PATH='' # S3 path prefix for storage bucket

# loader bucket, in this case leave this unset
# TC_AWS_LOADER_BUCKET='' #S3 bucket for loader
# TC_AWS_LOADER_ROOT_PATH='' # S3 path prefix for Loader bucket

# thumbnail result storage
TC_AWS_RESULT_STORAGE_BUCKET='result_storage.bucket_name' # S3 bucket for result storage
TC_AWS_RESULT_STORAGE_ROOT_PATH='' # S3 path prefix for result storage bucket

# other options
# maximum retries to get image from S3 Bucket
TC_AWS_MAX_RETRY=0
# Store result with metadata (for instance content-type)
TC_AWS_STORE_METADATA=False

# Adds some randomization in the S3 keys for the Storage and Result Storage.
# Defaults to False for Backwards Compatibility, set it to True for performance.
TC_AWS_RANDOMIZE_KEYS=False
# Sets a default name for requested images ending with a trailing /.
# Those images will be stored in result_storage and storage under the name set in this configuration.
TC_AWS_ROOT_IMAGE_NAME=''

# Whether the use server side encryption (at rest)
TC_AWS_STORAGE_SSE=False

# Put data into S3 with Reduced Redundancy
TC_AWS_STORAGE_RRS=False
```

> This setup will store your images and thumbnail results in S3. Images will be served from your configured Thumbor server names.
