import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Poll } from '../lib/poll.ts';

interface BarProps extends JSX.HTMLAttributes<HTMLDetailsElement> {
  value: number;
}
const Bar = (props: BarProps) =>
  <>
    <dt className={`c-bar-graph__content`}>{props.children}</dt>
    <dd
      className={`c-bar-graph__bar`}
      style={{width: `${props.value}%`}}
    >
    </dd>
  </>;

export interface BarGraphProps extends JSX.HTMLAttributes<HTMLDListElement> {
  responses: Poll['responses'];
}

export function BarGraph(props: BarGraphProps) {
  const responsesEntries = Object.entries(props.responses);
  const totalityOfAllValues = responsesEntries.reduce((p, c) => p + c[1], 0);

  return (
    <>
      <dl class={`c-bar-graph`}>
        {props.responses && responsesEntries
        .map((response, i) => {
            const value = (response[1] / totalityOfAllValues) * 100;
            const renderedValue = value ? value : 0;
            return <Bar value={renderedValue} key={i}>
              {`${renderedValue.toString().substring(0, 4)}% - ${response[0]}`}
            </Bar>
          })}
      </dl>
      <h2 className={`h5`}>Total Votes: {totalityOfAllValues}</h2>
    </>
  );
}
