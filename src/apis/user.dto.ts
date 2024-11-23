import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class UpdateUserDTO {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;
}
