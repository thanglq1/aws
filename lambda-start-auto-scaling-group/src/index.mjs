import {
  AutoScalingClient,
  UpdateAutoScalingGroupCommand,
} from "@aws-sdk/client-auto-scaling";

// Replace your region
const REGION = "ap-southeast-2";

export const handler = async (event, context) => {
  const clientAutoScalingGroup = new AutoScalingClient({ region: REGION });
  //   Replace your params
  const input = {
    AutoScalingGroupName: "demo-auto-scaling-group",
    MinSize: 1,
    MaxSize: 1,
    DesiredCapacity: 1,
  };
  const command = new UpdateAutoScalingGroupCommand(input);
  try {
    const response = await clientAutoScalingGroup.send(command);
    console.log("response:::", response);
  } catch (error) {
    console.error(error);
  }
};
