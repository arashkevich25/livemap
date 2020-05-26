import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Coords } from './coords.model';

@ObjectType()
export class Pin {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	title: string;

	@Field(() => Coords)
	coords: Coords;
}
