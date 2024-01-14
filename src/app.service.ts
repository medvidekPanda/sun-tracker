import { Injectable } from '@nestjs/common';
import { getPosition, getTimes } from 'suncalc';
import { DateTime } from 'luxon';

@Injectable()
export class AppService {
  getSunAltitude(): any {
    const date = DateTime.now().toJSDate();
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
}
