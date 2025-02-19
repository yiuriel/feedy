import { IsBoolean, IsOptional, IsString } from 'class-validator';

class FormSettingsDto {
  @IsOptional()
  @IsBoolean()
  stepped?: boolean;

  @IsOptional()
  @IsBoolean()
  allowMultipleResponses?: boolean;
}

export class UpdateFeedbackFormDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  customThankYouPage?: string;

  @IsOptional()
  settings?: FormSettingsDto;
}
