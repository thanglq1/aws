import { StopInstancesCommand } from "@aws-sdk/client-ec2";
import { EC2Client } from "@aws-sdk/client-ec2";

// Replace your region
const REGION = "ap-southeast-2";
// Replace your EC2 instances ids need stop
const INSTANCE_IDS = ["i-07bd48e03f4cfde6a"];

export const handler = async (event, context) => {
  console.log(event["key1"]);
  console.log(event["key2"]);

  const command = new StopInstancesCommand({
    InstanceIds: INSTANCE_IDS,
  });
  const client = new EC2Client({ region: REGION });
  try {
    const { StoppingInstances } = await client.send(command);
    const instanceIdsList = StoppingInstances.map(
      (instance) => `${instance.InstanceId}`
    );
    console.log("Stopping instance:");
    console.log(instanceIdsList.join("\n"));
  } catch (error) {
    console.error(error);
  }
};
