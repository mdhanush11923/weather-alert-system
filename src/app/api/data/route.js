import { writeFile, readFile } from "fs/promises";
import path from "path";

let latestSensorData = null;
const filePath = path.join(process.cwd(), "src", "sensorData.json");

export async function POST(request) {
  try {
    const bodyText = await request.text(); // 🔁 read raw text
    const body = JSON.parse(bodyText); // 🔁 manually parse JSON
    const { temperature, humidity, light, soilMoisture } = body;

    latestSensorData = { temperature, humidity, light, soilMoisture };

    await writeFile(filePath, JSON.stringify(latestSensorData, null, 2));

    console.log("✅ Received from ESP8266:", latestSensorData);

    return new Response(
      JSON.stringify({ message: "Data received successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error parsing JSON:", error);
    return new Response(JSON.stringify({ message: "Invalid JSON" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

export async function GET() {
  try {
    if (!latestSensorData) {
      const file = await readFile(filePath, "utf-8");
      latestSensorData = JSON.parse(file);
    }

    return new Response(JSON.stringify(latestSensorData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "No sensor data received yet" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
