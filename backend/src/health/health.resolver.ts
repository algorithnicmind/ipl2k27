import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class HealthStatus {
  @Field()
  status: string;

  @Field()
  service: string;

  @Field()
  version: string;

  @Field()
  timestamp: string;
}

@Resolver()
export class HealthResolver {
  @Query(() => HealthStatus)
  health(): HealthStatus {
    return {
      status: 'healthy',
      service: 'ciap-backend',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
    };
  }
}
