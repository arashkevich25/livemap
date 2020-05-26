import { AppService } from './app.service';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Pin } from './models/pin.model';
import { PubSubEngine } from 'graphql-subscriptions';
import { Config } from './config';
import { Inject } from '@nestjs/common';
import { MOVED_PINS, SUB_TOKEN } from './constants/movePinsSubscription';

@Resolver()
export class AppResolver {
	constructor(
		private readonly appService: AppService,
		@Inject(SUB_TOKEN) private pubSub: PubSubEngine,
	) {
		setInterval(() => this.appService.movePins(), Config.TimeOut);
	}

	@Query(() => [Pin], { name: 'pins' })
	getPins(): Pin[] {
		return this.appService.getPins();
	}

	@Subscription(() => [Pin], { name: 'pinsMoved', resolve: payload => payload })
	movePins() {
		return this.pubSub.asyncIterator<Pin>(MOVED_PINS);
	}
}
