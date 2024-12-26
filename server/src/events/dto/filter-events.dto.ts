import { IsOptional, IsString, IsDateString } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class FilterEventsDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  organizer?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  city?: string

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  fromDate?: Date

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  toDate?: Date
}
