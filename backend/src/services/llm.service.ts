import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LLMService implements OnModuleInit {
  private readonly apiUrl = 'http://llm-service:11434/api';
  private readonly model = 'phi'; // Using Microsoft's Phi-2 model

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    // Pull the model when the service starts
    try {
      await this.pullModel();
    } catch (error) {
      console.error('Failed to pull LLM model:', error);
    }
  }

  private async pullModel() {
    await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/pull`, {
        name: this.model,
      }),
    );
  }

  /**
   * Generate feedback form questions based on company type and goals
   * @param companyType Type of company (e.g., "restaurant", "software company", "retail store")
   * @param goals What kind of feedback the company wants to collect
   * @returns Array of generated questions
   */
  async generateFeedbackQuestions(
    companyType: string,
    goals: string,
  ): Promise<
    Array<{
      type: 'text' | 'rating' | 'multipleChoice';
      question: string;
      required?: boolean;
      options?: string[];
    }>
  > {
    const prompt = `Generate 5 relevant feedback questions for a ${companyType}. 
    Goals: ${goals}
    
    Format the response as a JSON array of objects with these fields:
    - type: either "text", "rating", or "multipleChoice"
    - question: the actual question text
    - required: boolean indicating if it should be required
    - options: array of strings (only for multipleChoice type)
    
    Make the questions specific to the company type and goals.
    Include a mix of question types.
    
    Response must be valid JSON. Example format:
    [
      {
        "type": "rating",
        "question": "How would you rate our service?",
        "required": true
      }
    ]`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.apiUrl}/generate`, {
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
          },
        }),
      );

      // Parse the response and ensure it's valid JSON
      const generatedText = response.data.response;
      try {
        const questions = JSON.parse(generatedText);
        return Array.isArray(questions) ? questions : [];
      } catch (error) {
        console.error('Failed to parse LLM response:', error);
        return [];
      }
    } catch (error) {
      console.error('Failed to generate questions:', error);
      return [];
    }
  }

  /**
   * Generate a thank you message for after form submission
   * @param companyName Name of the company
   * @returns Generated thank you message
   */
  async generateThankYouMessage(companyName: string): Promise<string> {
    const prompt = `Generate a brief, friendly thank you message for customers who just submitted feedback for ${companyName}. 
    Keep it professional but warm. Don't make it longer than two sentences.`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.apiUrl}/generate`, {
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.7,
          },
        }),
      );

      return response.data.response.trim();
    } catch (error) {
      console.error('Failed to generate thank you message:', error);
      return 'Thank you for your feedback! We appreciate your time and input.';
    }
  }
}
