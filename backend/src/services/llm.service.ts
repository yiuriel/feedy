import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';

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
    await this.httpService.axiosRef.post(`${this.apiUrl}/pull`, {
      name: this.model,
    });
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
      type: string;
      question: string;
      required: boolean;
      options?: string[];
    }>
  > {
    const prompt = `You are a feedback form expert. Generate a list of 3 relevant feedback questions for a ${companyType} that wants to ${goals}. 
    Return ONLY a JSON array of questions, where each question object has these properties:
    - type: one of "text", "rating", "choice", "boolean"
    - question: the actual question text
    - required: boolean
    - options: array of strings (only for rating and choice types)

    Format the response as a valid JSON array.`;

    const response = await this.httpService.axiosRef.post(
      `${this.apiUrl}/generate`,
      {
        model: this.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      },
      {
        timeout: 60000,
      },
    );

    return JSON.parse(response.data.response);
  }

  /**
   * Generate a thank you message for after form submission
   * @param companyName Name of the company
   * @returns Generated thank you message
   */
  async generateThankYouMessage(
    companyName: string,
    responseType: string,
  ): Promise<string> {
    const prompt = `Generate a thank you message for a customer who just submitted ${responseType} feedback for ${companyName}. Keep it short and professional.`;

    const response = await this.httpService.axiosRef.post(
      `${this.apiUrl}/generate`,
      {
        model: this.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      },
    );

    return response.data.response.trim();
  }
}
