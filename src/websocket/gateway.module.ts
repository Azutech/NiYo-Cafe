import { Module } from "@nestjs/common";
import { TaskGateway } from "./user.gateway";

@Module({
  providers : [TaskGateway],
})

export class GatewayModule{}

// Example usage

