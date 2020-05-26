import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { PubSub } from 'graphql-subscriptions';
import { SUB_TOKEN } from './constants/movePinsSubscription';

@Module({
	imports: [
		GraphQLModule.forRoot({
			installSubscriptionHandlers: true,
			autoSchemaFile: true,
			typePaths: ['./**/*.graphql'],
		}),

	],
	providers: [AppService, AppResolver,
		{
			provide: SUB_TOKEN,
			useValue: new PubSub(),
		},
	],
})
export class AppModule {}
