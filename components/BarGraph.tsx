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
  const totalVotes = responsesEntries.reduce((p, c) => p + c[1], 0);
  const maxVotes = Math.max(...responsesEntries.map(([_option, count]) => count));

  return (
    <>
      <dl class={`c-bar-graph`}>
        {responsesEntries
          .sort((a, b) => b[1] - a[1]) // descending order by vote count
          .map(([option, votes]) => {
            // Human-facing percent of votes for this option
            const percent = (votes / totalVotes) * 100;

            // Bar width, scaled relative to option with max votes
            const barWidthPercent = votes / maxVotes * 100;

            return <Bar value={barWidthPercent} key={option}>
              {`${formatPercent(percent)}% - ${option}`}
            </Bar>
          })}
      </dl>
      <h2 className={`h5`}>Total Votes: {totalVotes}</h2>
    </>
  );
}

function formatPercent(value: number): string {
  const str = value.toFixed(1);
  return str.endsWith('.0') ? str.slice(0, -'.0'.length) : str;
}
