## EC2 user data

It is a bootstrap script to configure the instance at the first launch. Bootstrapping means launching commands when the machine starts. So, that EC2 User data script is only run once and when it first starts, and then will never be run again. So the EC2 User Data has a very specific purpose. It is to automate boot tasks such as

- Install updates.
- Install software.
- Download common files from the Internet.

```
#!/bin/bash
# Use this for your user data (script from top to bottom)
# install httpd (Linux 2 version)
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
```

## Ref

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html

https://www.geeksforgeeks.org/create-an-ec2-instance-with-ec2-user-data-script-to-launch-website/
