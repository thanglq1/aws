## Image resizing

When a user uploads an image to S3, we will automatically generate multiple resolutions for it. As a thumbnail image, we have large, medium, and small to better display on different device sizes. This is a demo of how to do it.

## Layer

Lambda layers provide a convenient way to package libraries and other dependencies that you can use with your Lambda functions. Using layers reduces the size of uploaded deployment archives and makes it faster to deploy your code.

<center><img src="https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2020/06/23/Architecture2.gif" alt="Architecture diagram - With vs. without Lambda layer" width="800" height="366"></center>

## Permission for lambda

Permissions for lambda

```
{
    "Version": "2012-10-17",
    "Statement": [
        <!-- Permission get s3 object -->
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::source-image/*"
        },
         <!-- Permission put s3 object -->
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::destination-image-bucket-name/*"
        },
        <!-- Permission write log into cloudwatch -->
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "*"
        },
        {
             "Sid": "VisualEditor3",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*
        }
    ]
}
```

## Deploy

1. Deploy <b>sharp-layer</b>
   1. cd to <b>sharp-layer</b> and run command `npm install --arch=x64 --platform=linux sharp`
   2. Run command `mkdir -p ./layer/nodejs`
   3. Run command `mv ./node_modules ./layer/nodejs`
   4. Run command `sam deploy --guided`
2. Deploy <b>lambda-image-resizing</b>
   1. cd to <b>lambda-image-resizing</b> and run command `npm install`
   2. Run command `sam deploy --guided`

## Create the Amazon S3 trigger

1. Open <b>lambda function you deployed</b> choose <b>Add trigger</b> button
2. Choose <b>S3</b> as the source
3. For bucket, choose your source bucket image you want to trigger. Keep other defaut settings.
4. Acknowledge the <b>Recursive invocation</b> warning.
5. Choose <b>Add</b>

## Add layer to lambda function

1. Open <b>lambda function you deployed</b> choose <b>Layer</b> button
2. Choose <b>Custom layer</b>
3. Select <b>SharpLayer</b>
4. Choose <b>Add</b>

## Ref

https://aws.amazon.com/blogs/compute/using-lambda-layers-to-simplify-your-development-process/

https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-using

https://github.com/aws-samples/aws-lambda-layers-aws-sam-examples

https://repost.aws/knowledge-center/lambda-execution-role-s3-bucket

https://aws.amazon.com/blogs/mobile/how-to-use-lambda-layers-with-the-amplify-cli/
