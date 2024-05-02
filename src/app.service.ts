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

  getSunrise(): { hour: number; minute: number } {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;

    const { sunrise } = getTimes(date, latitude, longitude, height);

    return {
      hour: sunrise.getHours(),
      minute: sunrise.getMinutes(),
    };
  }

  getSunset(): { hour: number; minute: number } {
    const date = new Date();
    const latitude = 49.58;
    const longitude = 15.84;
    const height = 560;

    const { sunset } = getTimes(date, latitude, longitude, height);

    return {
      hour: sunset.getHours(),
      minute: sunset.getMinutes(),
    };
  }
}
