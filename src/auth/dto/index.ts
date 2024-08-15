import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto<T = unknown> {
    @ApiProperty()
    is_error!: boolean;

    @ApiProperty()
    message!: string;

    @ApiProperty()
    correlator_id!: string;

    @ApiProperty()
    data!: T;
}
