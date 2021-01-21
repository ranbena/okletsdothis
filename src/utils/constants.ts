import moment from 'moment';
import { RRule } from 'rrule';
import { Schedule } from 'src/contexts/schedule';

export const defaultSchedule: Schedule = {
  days: [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH],
  startDate: moment('08:00', 'HH:mm'),
  ordered: true,
};

export const eventSaveBatchSize = 5;

// yoga with adriene
export const placeholder = 'https://youtube.com/playlist?list=PLui6Eyny-UzwfYsbU4iBdXHorpVjkLx4d';

// TODO: use local file
export const fallbackVideoImage = 'https://i.ytimg.com/img/no_thumbnail.jpg';

export const suggestions = [
  {
    suggestion: 'Do Yoga for 30 days',
    title: '30 days of Yoga',
    id: 'PLui6Eyny-UzwfYsbU4iBdXHorpVjkLx4d',
  },
  {
    suggestion: 'Sit for meditation every evening',
    title: 'Samadhi Guided Meditations and Instructions',
    id: 'PL8qL2YhfbR-v6E078srKyef_CBAcdb0Xf',
  },
  {
    suggestion: 'Learn to play guitar on weekends',
    title: 'Andy Guitar Beginners Course',
    id: 'PL-RYb_OMw7GfG6MS0WBO1v2qvtomUkZci',
  },
  {
    suggestion: 'New recipe before every lunch',
    title: 'Vegan Meal Prep',
    id: 'PLILI9TO44f1Ad4vyq1WrBVC9HMXgMuHM1',
  },
  {
    suggestion: 'Take a crash course in Astronomy',
    title: 'Crash Course Astronomy',
    id: 'PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL',
  },
  {
    suggestion: 'Put sleep music at nights',
    title: 'Sleep by Headspace',
    id: 'PLW8o3_GFoCBOAwxWmQYN2iSBCjVLyNYz0',
  },
];
