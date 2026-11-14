
import { IsString, MinLength, IsBoolean } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(2)
  origin: string;

  @IsString()
  @MinLength(3)
  category: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  image: string;

  @IsBoolean()
  isFeatured: boolean;
}
