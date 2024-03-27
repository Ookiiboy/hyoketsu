import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

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

interface ResponsesType {
  any?: number;
}

interface BarGraphProps extends JSX.HTMLAttributes<HTMLDListElement> {
  responses: ResponsesType
}

export function BarGraph(props: BarGraphProps) {
  const responsesEntries = Object.entries(props.responses);
  const totalityOfAllValues = responsesEntries.reduce((p, c) => p + c[1], 0);

  return (
    <>
    <h2 className={`h4`}>Total Votes: {totalityOfAllValues}</h2>
    <br/>
    <dl class={`c-bar-graph`}>
      {props.responses && responsesEntries
      .map((response, i) => {
          const value = (response[1] / totalityOfAllValues) * 100;
          return <Bar value={value ? value : 0} key={i}>
            {`${value.toString().substring(0, 4)}% - ${response[0]}`}
          </Bar>
        })}
    </dl>
    </>
  );
}
