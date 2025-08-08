"use client";
import React, { useState } from "react";

import { Button } from "../../components/ui/button";
import SelectedOption from "./SelectedOption";
import TopicInput from "./TopicInput";

const Create = () => {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  console.log(topic,difficulty,selectedOption);
  

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleTopicChange = (value) => {
    setTopic(value);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  const handleContinue = () => {
    if (step === 0 && !selectedOption) {
      alert("Please select an option to continue");
      return;
    }
    if (step === 1 && (!topic || !difficulty)) {
      alert("Please fill in all fields to continue");
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Start Building Your Personal Study Material
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fill All details in order to generate study material for your next
          project
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        {step === 0 ? (
          <SelectedOption 
            selectedOption={selectedOption} 
            onOptionChange={handleOptionChange} 
          />
        ) : (
          <TopicInput 
            topic={topic}
            difficulty={difficulty}
            onTopicChange={handleTopicChange}
            onDifficultyChange={handleDifficultyChange}
          />
        )}

        <div className="mt-4 flex justify-around">
          {step !== 0 ? (
            <Button
              onClick={handlePrevious}
              variant={"outlined"}
            >
              Previous
            </Button>
          ) : (
            " "
          )}
           {step == 0 ? (
          <Button
            onClick={handleContinue}
          >
            Continue
          </Button>
     
      ) : (
        <Button
        // onClick={handleContinue}
      >
        Generate
      </Button>
      )}
      </div>
      </div>
    </div>
  );
};

export default Create;
