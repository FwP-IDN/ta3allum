import React, { useState } from "react";
import Game from "./Game";
import Config from "./Config";

const defaultConfig = {
  quizzes: [
    {
      question: "question-1",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-2",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-3",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-4",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-5",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-6",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-7",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-8",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-9",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
    {
      question: "question-10",
      options: ["option-A", "option-B", "option-C", "option-D"],
    },
  ]
};

const Hijaaiyyah = () => {
  const [configSubmitted, setConfigSubmitted] = useState(false);
  const [config, setConfig] = useState(defaultConfig);
  const onSubmit = (config) => {
    setConfig(config);
    setConfigSubmitted(true);
  };
  const onReset = () => {
    setConfig(defaultConfig);
    setConfigSubmitted(false);
  };
  return configSubmitted ? (
    <Game
      quizzes={config.quizzes}
      onReset={onReset.bind(this)}
    />
  ) : (
    <Config config={config} onSubmit={onSubmit.bind(this)} />
  );
};

export default Hijaaiyyah;
