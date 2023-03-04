import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  getCoffees(@Query() pageationQuery) {
    const { limt, offset } = pageationQuery;
    return `retun all coffees which lime=#${limt} and offset=#${offset}`;
  }

  @Get(':id')
  getCoffee(@Param('id') id: string) {
    return `return #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action will be remove #${id} data`;
  }
}
