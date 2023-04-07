import { RDSClient, StopDBInstanceCommand } from "@aws-sdk/client-rds";

// Replace your region
const REGION = "ap-southeast-2";
// Replace your db instance identifier
const DB_INSTANCE_IDENTIFIER = "rds-test";

export const handler = async (event, context) => {
  console.log("event:::", event);

  const rdsClient = new RDSClient({ region: REGION });
  const command = new StopDBInstanceCommand({
    DBInstanceIdentifier: DB_INSTANCE_IDENTIFIER,
  });
  const response = await rdsClient.send(command);
  console.log("resonpse:::", response);
  try {
  } catch (error) {
    console.error(error);
  }
};
