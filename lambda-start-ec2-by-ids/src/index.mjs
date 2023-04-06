import { StartInstancesCommand } from "@aws-sdk/client-ec2";
import { EC2Client } from "@aws-sdk/client-ec2";

// Replace your region
const REGION = "ap-southeast-2";
// Replace your EC2 instances ids need start
const INSTANCE_IDS = ["i-07bd48e03f4cfde6a"];

export const handler = async (event, context) => {
  const command = new StartInstancesCommand({
    InstanceIds: INSTANCE_IDS,
  });
  const client = new EC2Client({ region: REGION });
  try {
    const { StartingInstances } = await client.send(command);
    const instanceIdsList = StartingInstances.map(
      (instance) => `${instance.InstanceId}`
    );
    console.log("Starting instance:");
    console.log(instanceIdsList.join("\n"));
  } catch (error) {
    console.error(error);
  }
};
