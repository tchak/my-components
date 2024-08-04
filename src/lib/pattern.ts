import * as s from 'superstruct';

export enum SegmentType {
  Alpha = 'alpha',
  Numeric = 'numeric',
  Alphanumeric = 'alphanumeric',
  Char = 'char',
  Or = 'or',
}

const AlphaSegment = s.object({
  type: s.literal(SegmentType.Alpha),
  size: s.integer(),
});
const NumericSegment = s.object({
  type: s.literal(SegmentType.Numeric),
  size: s.integer(),
});
const AlphanumericSegment = s.object({
  type: s.literal(SegmentType.Alphanumeric),
  size: s.integer(),
});
const CharSegment = s.object({
  type: s.literal(SegmentType.Char),
  char: s.string(),
});

const SimpleSegment = s.union([
  AlphaSegment,
  NumericSegment,
  AlphanumericSegment,
  CharSegment,
]);

const OrSegment = s.object({
  type: s.literal(SegmentType.Or),
  segments: s.array(SimpleSegment),
});

const Segment = s.union([SimpleSegment, OrSegment]);
const Pattern = s.object({
  segments: s.array(Segment),
  separator: s.string(),
});

export type SimpleSegment = s.Infer<typeof SimpleSegment>;
export type Segment = s.Infer<typeof Segment>;
export type Pattern = s.Infer<typeof Pattern>;

export function createPattern(value: unknown): Pattern {
  return s.create(value, Pattern);
}

export function generateRegExp(pattern: Pattern): string {
  const escapeRegExp = (str: string) =>
    str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const segmentToRegExp = (segment: Segment): string => {
    switch (segment.type) {
      case SegmentType.Alpha:
        return `[A-Za-z]{${segment.size}}`;
      case SegmentType.Numeric:
        return `[0-9]{${segment.size}}`;
      case SegmentType.Alphanumeric:
        return `[A-Za-z0-9]{${segment.size}}`;
      case SegmentType.Char:
        return `${escapeRegExp(segment.char)}`;
      case SegmentType.Or:
        return `(${segment.segments.map((seg) => segmentToRegExp(seg)).join('|')})`;
    }
  };

  const separator =
    pattern.separator == ' '
      ? '\\s+'
      : pattern.separator
        ? `\\s*${pattern.separator}\\s*`
        : '';

  const segmentsRegExp = pattern.segments
    .map(segmentToRegExp)
    .join(`(${separator})?`);
  return `^${segmentsRegExp}$`;
}

const listOrFormat = new Intl.ListFormat('en', {
  style: 'long',
  type: 'disjunction',
});

export function generatePatternDescription(pattern: Pattern): string {
  const segmentToDescription = (segment: Segment): string => {
    switch (segment.type) {
      case SegmentType.Alpha:
        return `${segment.size} alphabetic ${pluralize(segment.size, 'character')}`;
      case SegmentType.Numeric:
        return `${segment.size} numeric ${pluralize(segment.size, 'digit')}`;
      case SegmentType.Alphanumeric:
        return `${segment.size} alphanumeric ${pluralize(segment.size, 'character')}`;
      case SegmentType.Char:
        return `the ${pluralize(segment.char.length, 'character')} "${segment.char}"`;
      case SegmentType.Or:
        return `either ${listOrFormat.format(segment.segments.map((seg) => segmentToDescription(seg)))}`;
    }
  };

  const pluralize = (count: number, word: string) =>
    `${word}${count > 1 ? 's' : ''}`;

  const segmentsDescription = pattern.segments
    .map(segmentToDescription)
    .join(', then ');

  return `The pattern matches ${segmentsDescription}, optionally separated by "${pattern.separator}".`;
}

export function generateExampleText(pattern: Pattern): string {
  const getRandomChar = (chars: string): string => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const segmentToExample = (segment: Segment): string => {
    switch (segment.type) {
      case SegmentType.Alpha:
        return Array.from({ length: segment.size }, () =>
          getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
        ).join('');
      case SegmentType.Numeric:
        return Array.from({ length: segment.size }, () =>
          getRandomChar('0123456789'),
        ).join('');
      case SegmentType.Alphanumeric:
        return Array.from({ length: segment.size }, () =>
          getRandomChar(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
          ),
        ).join('');
      case SegmentType.Char:
        return segment.char;
      case SegmentType.Or:
        const randomSegment =
          segment.segments[Math.floor(Math.random() * segment.segments.length)];
        return segmentToExample(randomSegment);
    }
  };

  return pattern.segments.map(segmentToExample).join(pattern.separator || '');
}
