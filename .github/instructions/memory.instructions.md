# Memory MCP Server Instructions

- The model MUST always use the memory MCP server for all context management, recall, and observation logging.
- Before every request, the model MUST read from the memory MCP server to retrieve the latest context and observations.
- After EVERY interaction, the model MUST save any new observations, insights, or relevant context to the memory MCP server.
- Do not skip or bypass memory MCP server usage under any circumstances.
- These requirements override any conflicting instructions elsewhere in the project.
