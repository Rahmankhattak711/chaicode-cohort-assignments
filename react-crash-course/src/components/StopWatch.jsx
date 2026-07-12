import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function StopWatch() {
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(0);

  const handleStop = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const resetTimer = () => {
    handleStop();
    setTime(0);
  };

  const startTimer = () => {
    if (timer) return;

    setTimer(
      setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000),
    );
  };

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <Card className="mx-auto w-full max-w-md border-border/70 bg-card/95 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          ⏱ Live Timer
        </div>
        <CardTitle className="mt-4 text-3xl font-semibold tracking-tight">
          Stopwatch
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div
          aria-label="Stopwatch display"
        >
          <span>{minutes}</span>
          <span className="mx-2 text-muted-foreground">:</span>
          <span>{seconds}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={startTimer}>
            Start
          </Button>
          <Button variant="secondary" size="lg" onClick={handleStop}>
            Stop
          </Button>
          <Button variant="outline" size="lg" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default StopWatch;
