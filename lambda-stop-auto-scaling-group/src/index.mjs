import {
  AutoScalingClient,
  UpdateAutoScalingGroupCommand,
} from "@aws-sdk/client-auto-scaling";

// Replace your region
const REGION = "ap-southeast-2";

export const handler = async (event, context) => {
  const clientAutoScalingGroup = new AutoScalingClient({ region: REGION });
  // In order to stop auto scaling group we will set min, max, desired is 0
  const input = {
    AutoScalingGroupName: "demo-auto-scaling-group",
    MinSize: 0,
    MaxSize: 0,
    DesiredCapacity: 0,
  };
  const command = new UpdateAutoScalingGroupCommand(input);
  try {
    const response = await clientAutoScalingGroup.send(command);
    console.log("response:::", response);
  } catch (error) {
    console.error(error);
  }
};
