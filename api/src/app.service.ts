import { Inject, Injectable } from '@nestjs/common';
import { pinsMock } from './mock/mock';
import { Pin } from './models/pin.model';
import { Coords } from './models/coords.model';
import { Config } from './config';
import { PubSubEngine } from 'graphql-subscriptions';
import { MOVED_PINS, SUB_TOKEN } from './constants/movePinsSubscription';

@Injectable()
export class AppService {
	constructor(
		@Inject(SUB_TOKEN) private pubSub: PubSubEngine,
	) {}

	getPins(): Pin[] {
		return pinsMock;
	}

	async movePins(): Promise<void> {
		pinsMock.forEach(pin => (pin.coords = this.calculateMoving(pin.coords)));
		await this.pubSub.publish(MOVED_PINS, pinsMock);
	}

	calculateMoving(coords: Coords): Coords {
		const random1 = Math.random();
		const radius = Config.nearbyKm/111300;
		const w = radius * Math.sqrt(random1);
		const random2 = Math.random();
		const t = 2 * Math.PI * random2;
		const x = w * Math.cos(t);
		const y0 = w * Math.sin(t);
		const originalLat = coords.lat;
		const x0 = x / Math.cos(originalLat);
		const originalLng = coords.lng;

		return {
			lat: originalLat + y0,
			lng: originalLng + x0,
		}
	}
}
