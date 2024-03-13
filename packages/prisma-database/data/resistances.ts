import {Resistance} from '@prisma/client';

export type Colors =
  | 'black'
  | 'brown'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet'
  | 'grey'
  | 'white';


const colors: Resistance[] = [
  {
    id: 0,
    name: 'black',
    modifier: 0,
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  {
    id: 1,
    name: 'brown',
    modifier: 1,
    backgroundColor: '#9f3e1e',
    textColor: '#FFFFFF',
  },
  {
    id: 2,
    name: 'red',
    modifier: 2,
    backgroundColor: '#df1217',
    textColor: '#FFFFFF',
  },
  {
    id: 3,
    name: 'orange',
    modifier: 3,
    backgroundColor: '#f2571a',
    textColor: '#FFFFFF',
  },
  {
    id: 4,
    name: 'yellow',
    modifier: 4,
    backgroundColor: '#fed615',
    textColor: '#000000',
  },
  {
    id: 5,
    name: 'green',
    modifier: 5,
    backgroundColor: '#42b237',
    textColor: '#FFFFFF',
  },
  {
    id: 6,
    name: 'blue',
    modifier: 6,
    backgroundColor: '#4060a4',
    textColor: '#FFFFFF',
  },
  {
    id: 7,
    name: 'violet',
    modifier: 7,
    backgroundColor: '#b21b82',
    textColor: '#FFFFFF',
  },
  {
    id: 8,
    name: 'gray',
    modifier: 8,
    backgroundColor: '#979898',
    textColor: '#FFFFFF',
  },
  {
    id: 9,
    name: 'white',
    modifier: 9,
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
];

type ColorDictionary = Record<Colors, Resistance>;

export const colorDictionary: ColorDictionary = colors.reduce(
  (prev, cur) => ({ ...prev, [cur.name]: cur }),
  {} as ColorDictionary
);

export default colors;
