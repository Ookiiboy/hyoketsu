import { useEffect, useState, useRef, useCallback } from 'preact/hooks';
import { BarGraph, BarGraphProps } from "../components/BarGraph.tsx";
import { Poll } from '../lib/poll.ts';
import { loadPoll } from '../lib/api-client.ts';

export type AutoRefreshingBarGraphProps = BarGraphProps & {
  pollId: Poll['id'];
}

export function AutoRefreshingBarGraph(props: AutoRefreshingBarGraphProps) {
  const responses = useAutoRefresh({
    pollId: props.pollId,
    initialResponses: props.responses,
  });

  return <BarGraph responses={responses} />
}

type AutoRefreshSettings = {
  pollId: Poll['id'],
  initialResponses: AutoRefreshingBarGraphProps['responses'],
}

function useAutoRefresh(settings: AutoRefreshSettings): AutoRefreshingBarGraphProps['responses'] {
  const { pollId, initialResponses } = settings;
  const [responses, setResponses] = useState(initialResponses);
  const isLoading = useRef(false);

  const refreshData = useCallback((visible: boolean) => {
    if (!visible || isLoading.current) return;

    isLoading.current = true;
    loadPoll(pollId)
      .then(poll => setResponses(poll.responses))
      .catch(error => console.error(error))
      .finally(() => isLoading.current = false);
    },
    [pollId, setResponses, isLoading]
  );

  useVisibilityChange(refreshData);

  return responses;
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
