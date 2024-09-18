import {LuSun} from 'react-icons/lu';
import {CiStar} from 'react-icons/ci';
import {PiCalendarDotsLight} from 'react-icons/pi';
import {GoTasklist} from 'react-icons/go';

export const menu = [
  {
    name: 'My Day',
    icon: LuSun,
    path: '/my-day',
  },
  {
    name: 'Important',
    icon: CiStar,
    path: '/important',
  },
  {
    name: 'Planned',
    icon: PiCalendarDotsLight,
    path: '/planned',
  },
  {
    name: 'Tasks',
    icon: GoTasklist,
    path: '/tasks',
  },
];
