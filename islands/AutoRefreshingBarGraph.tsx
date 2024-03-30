import { useEffect, useState, useMemo, useCallback } from 'preact/hooks';
import { BarGraph, BarGraphProps } from "../components/BarGraph.tsx";
import { PollId } from '../lib/poll-id.ts';
import { Poll } from '../lib/poll.ts';

export type AutoRefreshingBarGraphProps = BarGraphProps & {
  pollId: PollId;
}

export function AutoRefreshingBarGraph(props: AutoRefreshingBarGraphProps) {
  const responses = useAutoRefresh({
    pollId: props.pollId,
    initialResponses: props.responses,
    interval: 5000
  });

  return <BarGraph responses={responses} />
}

type AutoRefreshSettings = {
  pollId: PollId,
  initialResponses: AutoRefreshingBarGraphProps['responses'],
  interval: number,
}

function useAutoRefresh(settings: AutoRefreshSettings): AutoRefreshingBarGraphProps['responses'] {
  const { pollId, initialResponses, interval } = settings;
  const [responses, setResponses] = useState(initialResponses);
  const [active, setActive] = useState(true);

  useVisibilityChange(setActive);

  const refreshData = useCallback(() => {
      return fetch(`/api/poll/${pollId}`)
        .then(resp => resp.json())
        .then(json => {
          const poll = json as Poll;
          setResponses(poll.responses);
        })
        .catch(error => console.error(error));
    },
    [pollId, setResponses]
  );

  useInterval({
    cb: refreshData,
    interval,
    active,
    runOnceBeforeInterval: true,
  });

  return responses;
}

type IntervalSettings = {
  cb: () => any,
  interval: number,
  active: boolean,
  runOnceBeforeInterval: boolean
};

function useInterval(settings: IntervalSettings) {
  const { cb, interval, active, runOnceBeforeInterval } = settings;

  useEffect(() => {
    if (active) {
      if (runOnceBeforeInterval) {
        cb();
      }

      const intervalId = setInterval(cb, interval);
      return () => clearInterval(intervalId);
    }
  }, [cb, interval, active, runOnceBeforeInterval]);
}

function useVisibilityChange(cb: (visible: boolean) => void) {
  useEffect(() => {
    const listener = () => {
      cb(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
  }, [cb]);
}
