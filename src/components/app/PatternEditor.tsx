import { useState, useEffect } from 'react';
import {
  TrashIcon,
  CirclePlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  RefreshCcwIcon,
} from 'lucide-react';
import isEqual from 'react-fast-compare';

import type { Pattern, Segment, SimpleSegment } from '../../lib/pattern';
import {
  SegmentType,
  generateRegExp,
  generateExampleText,
  generatePatternDescription,
} from '../../lib/pattern';

import { TextField } from '../ui/TextField';
import { NumberField } from '../ui/NumberField';
import { Select, SelectItem } from '../ui/Select';
import { Button } from '../ui/Button';
import { RadioGroup, Radio } from '../ui/RadioGroup';
import { Tooltip, TooltipTrigger } from '../ui/Tooltip';

export type PatternProps = {
  pattern: Pattern;
  onChange?: (pattern: Pattern) => void;
};

export function PatternEditor(props: PatternProps) {
  const {
    pattern,
    add,
    update,
    find,
    exampleText,
    refreshExampleText,
    isInvalid,
  } = usePattern(props);

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-col gap-1">
        {pattern.segments.map((segment, index) => (
          <SegmentItem
            key={index}
            segment={segment}
            isFirst={index == 0}
            isLast={index == pattern.segments.length - 1}
            action={find(index)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <RadioGroup
          label="Separated by"
          isRequired
          orientation="horizontal"
          value={pattern.separator}
          onChange={(separator) => update('separator', separator)}
        >
          <Radio value={' '}>" "</Radio>
          <Radio value={'-'}>"-"</Radio>
        </RadioGroup>
        <Button variant="icon" onPress={() => add()}>
          <CirclePlusIcon className="mr-1" />
          Add Segment
        </Button>
      </div>
      <ExampleField
        pattern={pattern}
        isInvalid={isInvalid}
        exampleText={exampleText}
        refreshExampleText={refreshExampleText}
      />
    </div>
  );
}

function ExampleField({
  pattern,
  exampleText,
  isInvalid,
  refreshExampleText,
}: {
  pattern: Pattern;
  exampleText: string;
  isInvalid: boolean;
  refreshExampleText: (pattern: Pattern, example?: string) => void;
}) {
  const regexp = generateRegExp(pattern);
  const description = generatePatternDescription(pattern);
  return (
    <div className="flex items-start">
      <TooltipTrigger>
        <TextField
          className="max-w-96"
          label="Example"
          description={description}
          value={exampleText}
          onChange={(text) => refreshExampleText(pattern, text)}
          isInvalid={isInvalid}
        />
        <Tooltip>{regexp}</Tooltip>
      </TooltipTrigger>
      <Button
        variant="icon"
        onPress={() => refreshExampleText(pattern)}
        aria-label="Refresh example text"
        className="mt-6 ml-1"
      >
        <RefreshCcwIcon />
      </Button>
    </div>
  );
}

function SegmentItem({
  segment,
  isFirst,
  isLast,
  action,
}: {
  segment: Segment;
  isFirst: boolean;
  isLast: boolean;
  action: SegmentAction;
}) {
  return (
    <>
      <fieldset className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <Button
              variant="icon"
              onPress={action.up}
              isDisabled={isFirst}
              aria-label="Move segment up"
            >
              <ArrowUpIcon aria-hidden className="h-4 w-4" />
            </Button>
            <Button
              variant="icon"
              onPress={action.down}
              isDisabled={isLast}
              aria-label="Move segment down"
            >
              <ArrowDownIcon aria-hidden className="h-4 w-4" />
            </Button>
          </div>
          <Select
            isRequired
            aria-label="Segment type"
            selectedKey={segment.type}
            onSelectionChange={(type) =>
              action.update('type', type as Segment['type'])
            }
          >
            {Object.values(SegmentType).map((type) => (
              <SelectItem key={type} id={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
          {segment.type == SegmentType.Char ? (
            <TextField
              className="w-40"
              isRequired
              aria-label="Segment characters"
              minLength={1}
              value={segment.char}
              onChange={(char) => action.update('char', char)}
            />
          ) : null}
          {segment.type == SegmentType.Or ? (
            <Button
              variant="icon"
              onPress={() => action.add()}
              className="w-40"
            >
              <CirclePlusIcon className="mr-1" />
              Add Segment
            </Button>
          ) : null}
          {segment.type != SegmentType.Char &&
          segment.type != SegmentType.Or ? (
            <NumberField
              className="w-40"
              isRequired
              aria-label="Segment size"
              minValue={1}
              value={segment.size}
              onChange={(size) => action.update('size', size)}
            />
          ) : null}
        </div>
        <Button
          variant="icon"
          onPress={action.remove}
          isDisabled={isFirst}
          aria-label="Remove segment"
        >
          <TrashIcon
            aria-hidden
            className={isFirst ? '' : 'hover:text-red-500'}
          />
        </Button>
      </fieldset>
      {segment.type == SegmentType.Or ? (
        <fieldset className="outline-0 p-1 border border-gray-300 dark:border-zinc-600 rounded-lg -mx-1.5">
          {segment.segments.map((subSegment, subIndex) => (
            <SubSegmentItem
              key={subIndex}
              segment={subSegment}
              isFirst={subIndex == 0}
              isLast={subIndex == segment.segments.length - 1}
              action={action.find(subIndex)}
            />
          ))}
        </fieldset>
      ) : null}
    </>
  );
}

function SubSegmentItem({
  segment,
  isFirst,
  isLast,
  action,
}: {
  segment: SimpleSegment;
  isFirst: boolean;
  isLast: boolean;
  action: SubSegmentAction;
}) {
  return (
    <>
      <fieldset className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <Button
              variant="icon"
              onPress={action.up}
              isDisabled={isFirst}
              aria-label="Move segment up"
            >
              <ArrowUpIcon aria-hidden className="h-4 w-4" />
            </Button>
            <Button
              variant="icon"
              onPress={action.down}
              isDisabled={isLast}
              aria-label="Move segment down"
            >
              <ArrowDownIcon aria-hidden className="h-4 w-4" />
            </Button>
          </div>
          <Select
            isRequired
            aria-label="Segment type"
            selectedKey={segment.type}
            onSelectionChange={(type) =>
              action.update('type', type as SegmentType)
            }
          >
            {['alpha', 'numeric', 'alphanumeric', 'char'].map((type) => (
              <SelectItem key={type} id={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
          {segment.type == SegmentType.Char ? (
            <TextField
              className="w-40"
              isRequired
              aria-label="Segment characters"
              minLength={1}
              value={segment.char}
              onChange={(char) => action.update('char', char)}
            />
          ) : (
            <NumberField
              className="w-40"
              isRequired
              aria-label="Segment size"
              minValue={1}
              value={segment.size}
              onChange={(size) => action.update('size', size)}
            />
          )}
        </div>
        <Button
          variant="icon"
          onPress={action.remove}
          isDisabled={isFirst}
          aria-label="Remove segment"
        >
          <TrashIcon
            aria-hidden
            className={isFirst ? '' : 'hover:text-red-500'}
          />
        </Button>
      </fieldset>
    </>
  );
}

function useExampleText(pattern: Pattern) {
  const validate = (pattern: Pattern, testText: string) =>
    new RegExp(generateRegExp(pattern)).test(testText);
  const refreshExampleText = (pattern: Pattern, text?: string) => {
    const exampleText = text ?? generateExampleText(pattern);
    setExampleText(exampleText);
    setIsInvalid(!validate(pattern, exampleText));
  };

  const [exampleText, setExampleText] = useState(() =>
    generateExampleText(pattern),
  );
  const [isInvalid, setIsInvalid] = useState(
    () => !validate(pattern, exampleText),
  );

  return { isInvalid, exampleText, refreshExampleText };
}

function usePattern(props: PatternProps) {
  const [pattern, setPattern] = useState(props.pattern);
  const exampleTextProps = useExampleText(pattern);

  useEffect(() => {
    if (!isEqual(pattern, props.pattern)) {
      exampleTextProps.refreshExampleText(pattern);
      props.onChange?.(pattern);
    }
  }, [pattern]);

  useEffect(() => {
    if (!isEqual(pattern, props.pattern)) {
      setPattern(props.pattern);
    }
  }, [props.pattern]);

  function find(index: number): {
    remove: () => void;
    update: UpdatePattern;
    up: () => void;
    down: () => void;
    add: () => void;
    find: (subIndex: number) => {
      remove: () => void;
      update: UpdatePattern;
      up: () => void;
      down: () => void;
    };
  } {
    return {
      remove: () => setPattern(removeSegment(index)),
      update: (attribute, value) => {
        switch (attribute) {
          case 'type':
            setPattern(updateSegmentType(index, value as SegmentType));
            break;
          case 'size':
            setPattern(updateSegmentSize(index, Number(value)));
            break;
          case 'char':
            setPattern(updateSegmentChar(index, String(value)));
            break;
        }
      },
      up: () => setPattern(moveSegmentUp(index)),
      down: () => setPattern(moveSegmentDown(index)),
      add: () => setPattern(addSegment(index)),
      find: (subIndex: number) => ({
        remove: () => setPattern(removeSegment(index, subIndex)),
        up: () => setPattern(moveSegmentUp(index, subIndex)),
        down: () => setPattern(moveSegmentDown(index, subIndex)),
        update: (attribute, value) => {
          switch (attribute) {
            case 'type':
              setPattern(
                updateSegmentType(index, value as SegmentType, subIndex),
              );
              break;
            case 'size':
              setPattern(updateSegmentSize(index, Number(value), subIndex));
              break;
            case 'char':
              setPattern(updateSegmentChar(index, String(value), subIndex));
              break;
          }
        },
      }),
    };
  }

  return {
    pattern,
    update: (attribute: 'separator', value: string) =>
      setPattern((pattern) => ({ ...pattern, [attribute]: value })),
    add: () => setPattern(addSegment()),
    find,
    ...exampleTextProps,
  };
}

interface UpdatePattern {
  (attribute: 'type', value: SegmentType): void;
  (attribute: 'size', value: number): void;
  (attribute: 'char', value: string): void;
}
type SegmentAction = ReturnType<ReturnType<typeof usePattern>['find']>;
type SubSegmentAction = ReturnType<SegmentAction['find']>;

function addSegment(index?: number): (pattern: Pattern) => Pattern {
  return (pattern) => ({
    ...pattern,
    segments:
      index != null
        ? pattern.segments.map((segment, i) => {
            if (i == index && segment.type == SegmentType.Or) {
              return {
                ...segment,
                segments: [
                  ...segment.segments,
                  { type: SegmentType.Alpha, size: 3 },
                ],
              };
            }
            return segment;
          })
        : [...pattern.segments, { type: SegmentType.Alpha, size: 3 }],
  });
}

// function updateSegment(index: number, subIndex?: number): UpdatePattern {
//   return (attribute, value) => {
//     switch (attribute) {
//       case 'type':
//         return updateSegmentType(index, value as Segment['type'], subIndex);
//       case 'size':
//         return updateSegmentSize(index, Number(value), subIndex);
//       case 'char':
//         return updateSegmentChar(index, String(value), subIndex);
//     }
//   };
// }

function updateSegmentType(
  index: number,
  type: SegmentType,
  subIndex?: number,
): (pattern: Pattern) => Pattern {
  return (pattern) => ({
    ...pattern,
    segments: pattern.segments.map((segment, i) => {
      if (subIndex != null) {
        if (i == index && segment.type == SegmentType.Or) {
          return {
            ...segment,
            segments: segment.segments.map((subSegment, j) => {
              if (
                j != subIndex ||
                subSegment.type == type ||
                type == SegmentType.Or
              ) {
                return subSegment;
              }
              if (type == SegmentType.Char) {
                return { type, char: '' };
              } else if (subSegment.type != SegmentType.Char) {
                return { ...subSegment, type };
              }
              return { type, size: 1 };
            }),
          };
        }
        return segment;
      }
      if (i != index || segment.type == type) {
        return segment;
      }
      if (type == SegmentType.Char) {
        return { type, char: '' };
      } else if (type == SegmentType.Or) {
        if (segment.type == SegmentType.Or) {
          return segment;
        }
        return { type, segments: [segment] };
      } else if (
        segment.type != SegmentType.Char &&
        segment.type != SegmentType.Or
      ) {
        return { ...segment, type };
      }
      return { type, size: 1 };
    }),
  });
}

function updateSegmentSize(
  index: number,
  size: number,
  subIndex?: number,
): (pattern: Pattern) => Pattern {
  return (pattern) => ({
    ...pattern,
    segments: pattern.segments.map((segment, i) => {
      if (i == index) {
        if (segment.type == SegmentType.Or) {
          if (subIndex != null) {
            return {
              ...segment,
              segments: segment.segments.map((subSegment, j) => {
                if (j == subIndex && subSegment.type != SegmentType.Char) {
                  return { ...subSegment, size };
                }
                return subSegment;
              }),
            };
          }
        } else if (segment.type != SegmentType.Char) {
          return { ...segment, size };
        }
      }
      return segment;
    }),
  });
}

function updateSegmentChar(
  index: number,
  char: string,
  subIndex?: number,
): (pattern: Pattern) => Pattern {
  return (pattern) => ({
    ...pattern,
    segments: pattern.segments.map((segment, i) => {
      if (i == index) {
        if (segment.type == SegmentType.Or) {
          if (subIndex != null) {
            return {
              ...segment,
              segments: segment.segments.map((subSegment, j) => {
                if (j == subIndex && subSegment.type == SegmentType.Char) {
                  return { ...subSegment, char };
                }
                return subSegment;
              }),
            };
          }
        } else if (segment.type == SegmentType.Char) {
          return { ...segment, char };
        }
      }
      return segment;
    }),
  });
}

function removeSegment(
  index: number,
  subIndex?: number,
): (pattern: Pattern) => Pattern {
  return (pattern) => ({
    ...pattern,
    segments:
      subIndex != null
        ? pattern.segments.map((segment, i) => {
            if (i == index && segment.type == SegmentType.Or) {
              return {
                ...segment,
                segments: segment.segments.filter((_, j) => j != subIndex),
              };
            }
            return segment;
          })
        : pattern.segments.filter((_, i) => i != index),
  });
}

function moveSegmentUp(
  index: number,
  subIndex?: number,
): (pattern: Pattern) => Pattern {
  return (pattern) => {
    const segments = [...pattern.segments];
    if (subIndex != null) {
      const segment = segments.at(index);
      if (segment?.type == SegmentType.Or && subIndex > 0) {
        const subSegments = [...segment.segments];
        [subSegments[subIndex - 1], subSegments[subIndex]] = [
          subSegments[subIndex],
          subSegments[subIndex - 1],
        ];
        segments[index] = { ...segment, segments: subSegments };
      }
    } else if (index > 0) {
      [segments[index - 1], segments[index]] = [
        segments[index],
        segments[index - 1],
      ];
    }
    return { ...pattern, segments };
  };
}

function moveSegmentDown(
  index: number,
  subIndex?: number,
): (pattern: Pattern) => Pattern {
  return (pattern) => {
    const segments = [...pattern.segments];
    if (subIndex != null) {
      const segment = segments.at(index);
      if (
        segment?.type == SegmentType.Or &&
        subIndex < segment.segments.length - 1
      ) {
        const subSegments = [...segment.segments];
        if (subIndex < subSegments.length - 1) {
          [subSegments[subIndex], subSegments[subIndex + 1]] = [
            subSegments[subIndex + 1],
            subSegments[subIndex],
          ];
          segments[index] = { ...segment, segments: subSegments };
        }
      }
    } else if (index < segments.length - 1) {
      [segments[index], segments[index + 1]] = [
        segments[index + 1],
        segments[index],
      ];
    }
    return { ...pattern, segments };
  };
}
