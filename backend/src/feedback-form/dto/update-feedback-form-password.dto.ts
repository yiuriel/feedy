import { IsOptional, IsString } from 'class-validator';

export class UpdateFeedbackFormPasswordDto {
  @IsOptional()
  @IsString()
  password?: string | null;
}
