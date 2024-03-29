## Start auto scaling group

When we are using auto scaling group, we can not stop EC2 instances by ids. In order to stop it, we need set min, max, desired is 0. After we stop auto scaling group, we need start it again. This is demo how to do it.

## Permission for lambda

To start auto scaling group we need allows permissions for lambda

```
{
    "Version": "2012-10-17",
    "Statement": [
        <!-- Permission start auto scaling group -->
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "rds:StopDBInstance",
            "Resource": "*"
        },
        <!-- Permission write log into cloudwatch -->
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "*"
        },
        {
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

## Setup Amazon EventBridge

Create a schedule to start auto scaling group with Amazon EventBrige

1. Go to Amazon EventBridge. In left menu under <b>Scheduler</b>, click <b>Schedule group</b>
2. Enter group name such as <b>start-auto-scaling-group</b>
3. Click <b>Create schedule group</b>
4. In left menu under <b>Scheduler</b>, click <b>Schedules</b>
5. On <b>Schedules</b> page, click <b>Create schedules</b>
6. Enter schedule name such as <b>start-auto-scaling-group-schedule</b>
7. Enter description such as <b>Schedule for start auto scaling group</b>
8. Choose <b>start-auto-scaling-group</b> we created at step 2
9. Schedule pattern, choose <b>Recurring schedule</b>
10. Schedule type, choose <b>Cron-based schedule</b>
11. Cron expression is `0 7 \* \* ? *` it means we will start auto scaling group at 07:00 everyday
12. Flexible time window, choose </b>off</b>
13. On <b>Timeframe</b>, select timezone, start date, time and end date, time
14. Click <b>Next</b>
15. On <b>Select target</b>, choose <b>AWS Lambda</b> and then choose your lambda function and then click <b>Next</b>
16. On Setting, <b>Retry policy and dead-letter queue (DLQ)</b> keep default value
17. On Settings, <b>Permission</b> choose <b>Create new role for this schedule</b> and then enter role name such as <b>EventBridge-Start-Auto-Scaling-Group</b> (You can choose <b>Use existing role</b> if you created role before) and then click <b>Next</b>
18. On <b>Review and create schedule</b> click <b>Create schedule</b>

## Run local

1. Need install Sam cli and Docker desktop
2. Open Docker desktop
3. Run command `sam local invoke [function_name] -e [event_path] eg: sam local invoke StartAutoScalingGroup -e events/event.json`

## Deploy

1. Run command `sam build`
2. Run command `sam deploy --guided`

## Ref

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-auto-scaling/classes/updateautoscalinggroupcommand.html
