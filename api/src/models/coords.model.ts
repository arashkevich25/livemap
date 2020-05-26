import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coords {
	@Field(() => Float)
	lat: number;

	@Field(() => Float)
	lng: number;
}
