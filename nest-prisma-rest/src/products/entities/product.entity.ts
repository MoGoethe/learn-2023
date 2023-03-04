import { ApiProperty } from '@nestjs/swagger';
import { Product, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class ProductEntity implements Product {
  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty({ type: Number })
  @Min(0.1)
  @Transform(({ value }) => value.toNumber())
  price: Prisma.Decimal;

  @ApiProperty()
  @MinLength(5)
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ default: true })
  id: string;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
