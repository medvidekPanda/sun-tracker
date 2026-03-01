import { Injectable } from '@nestjs/common';
import { getPosition, getTimes } from 'suncalc';

@Injectable()
export class AppService {
  getSunAltitude(): any {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;

    const times = getTimes(date, latitude, longitude, height);

    return (
      getPosition(
        /*Date*/ times.solarNoon,
        /*Number*/ latitude,
        /*Number*/ longitude,
      ).altitude *
      (180 / Math.PI)
    );
  }

  private formatTimeResponse(date: Date): { dateTime: string; hour: number; minute: number } {
    return {
      dateTime: date.toISOString(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }

  getSunrise(): { dateTime: string; hour: number; minute: number } {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;
    const { sunrise } = getTimes(date, latitude, longitude, height);
    return this.formatTimeResponse(sunrise);
  }

  getSunset(): { dateTime: string; hour: number; minute: number } {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;
    const { sunset } = getTimes(date, latitude, longitude, height);
    return this.formatTimeResponse(sunset);
  }

  getDawn(): { dateTime: string; hour: number; minute: number } {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;
    const { dawn } = getTimes(date, latitude, longitude, height);
    return this.formatTimeResponse(dawn);
  }

  getDusk(): { dateTime: string; hour: number; minute: number } {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;
    const { dusk } = getTimes(date, latitude, longitude, height);
    return this.formatTimeResponse(dusk);
  }
}
