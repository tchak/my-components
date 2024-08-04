type AlphaSegment = {
  type: 'alpha';
  size: number;
};

type NumericSegment = {
  type: 'numeric';
  size: number;
};

type AlphanumericSegment = {
  type: 'alphanumeric';
  size: number;
};

type CharSegment = {
  type: 'char';
  char: string;
};

export type SimpleSegment =
  | AlphaSegment
  | NumericSegment
  | AlphanumericSegment
  | CharSegment;

type OrSegment = {
  type: 'or';
  segments: SimpleSegment[];
};

export type Segment = SimpleSegment | OrSegment;

export type Pattern = {
  segments: Segment[];
  separator: string;
};

export function generateRegExp(pattern: Pattern): string {
  const escapeRegExp = (str: string) =>
    str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const segmentToRegExp = (segment: Segment): string => {
    switch (segment.type) {
      case 'alpha':
        return `[A-Za-z]{${segment.size}}`;
      case 'numeric':
        return `[0-9]{${segment.size}}`;
      case 'alphanumeric':
        return `[A-Za-z0-9]{${segment.size}}`;
      case 'char':
        return `${escapeRegExp(segment.char)}`;
      case 'or':
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
      case 'alpha':
        return `${segment.size} alphabetic character${segment.size > 1 ? 's' : ''}`;
      case 'numeric':
        return `${segment.size} numeric digit${segment.size > 1 ? 's' : ''}`;
      case 'alphanumeric':
        return `${segment.size} alphanumeric character${segment.size > 1 ? 's' : ''}`;
      case 'char':
        return `the character${segment.char.length > 1 ? 's' : ''} "${segment.char}"`;
      case 'or':
        return `either ${listOrFormat.format(segment.segments.map((seg) => segmentToDescription(seg)))}`;
    }
  };

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
      case 'alpha':
        return Array.from({ length: segment.size }, () =>
          getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
        ).join('');
      case 'numeric':
        return Array.from({ length: segment.size }, () =>
          getRandomChar('0123456789'),
        ).join('');
      case 'alphanumeric':
        return Array.from({ length: segment.size }, () =>
          getRandomChar(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
          ),
        ).join('');
      case 'char':
        return segment.char;
      case 'or':
        const randomSegment =
          segment.segments[Math.floor(Math.random() * segment.segments.length)];
        return segmentToExample(randomSegment);
    }
  };

  return pattern.segments.map(segmentToExample).join(pattern.separator || '');
}
