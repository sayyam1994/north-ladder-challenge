import {
  IsString,
  IsEmail,
  IsDateString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class LocationDto {
  @IsString()
  @ApiProperty()
  street: string

  @IsString()
  @ApiProperty()
  city: string

  @IsString()
  @ApiProperty()
  state: string

  @IsString()
  @ApiProperty()
  zip: string
}

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  eventName: string

  @IsDateString()
  @ApiProperty()
  eventDate: Date

  @IsString()
  @ApiProperty()
  organizer: string

  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  phone: string

  @ValidateNested()
  @Type(() => LocationDto)
  @ApiProperty()
  location: LocationDto
}
