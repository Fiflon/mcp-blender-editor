import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";


const server = new McpServer({
  name: "blender-editor-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
    "get_hello",
    "Get greeting from a server to a specific user",
    {
        name: z.string().min(2).describe("Name of the person to greet"),
    },
    async ({ name }) => {
        return {
            content: [
                {
                    type: "text",
                    text: `Hello, ${name}! Welcome to the Blender MCP Server.`,
                },
            ],
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Blender MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});