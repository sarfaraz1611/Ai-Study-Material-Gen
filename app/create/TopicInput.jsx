"use client";

import React, { useState } from "react";
import { Textarea } from "./../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./../../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./../../components/ui/card";
import { Label } from "./../../components/ui/label";

const TopicInput = ({ topic, difficulty, onTopicChange, onDifficultyChange }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Material Generator</h3>
          <p className="text-gray-600">
            Enter a topic and select difficulty level to generate comprehensive study materials
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Enter topic or paste the content for which you want to generate study material
            </label>
            <textarea
              id="topic"
              placeholder="Topic Value"
              value={topic}
              onChange={(e) => onTopicChange(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="space-y-2 w-full">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Select the difficulty Level
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select difficulty...</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;