import { IsString, IsOptional, IsUUID, IsNotEmpty } from "class-validator";

export class CreatePostDto {

  @IsNotEmpty()
  @IsString()
  caption:string;

  @IsOptional()
  @IsString()
  image_url: string;

  @IsOptional()
  @IsString()
  video_url: string;

  
}