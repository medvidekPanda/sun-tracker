import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sun-altitude')
  sunAltitude(): string {
    return this.appService.getSunAltitude();
  }

  @Get('/sunrise')
  getSunrise(): { hour: number; minute: number } {
    return this.appService.getSunrise();
  }

  @Get('/sunset')
  getSunset(): { hour: number; minute: number } {
    return this.appService.getSunset();
  }
}
