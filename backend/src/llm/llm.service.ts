import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { QuestionType } from '../common/enums/question-type.enum';

@Injectable()
export class LLMService implements OnModuleInit {
  private readonly apiUrl = 'http://llm-service:11434/api';
  private readonly model = 'phi'; // Using our fine-tuned model

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
    // await this.httpService.axiosRef.post(`${this.apiUrl}/pull`, {
    //   name: this.model,
    // });
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
    const prompt = `You are a feedback form expert. Generate 2 relevant feedback questions for a ${companyType} that wants to ${goals}.
  For each question, provide these properties in a simple format:
  - First line: question type (text, rating, multiple_choice, checkbox)
  - Second line: the question itself
  - Third line: required (yes/no)
  - Fourth line (only for rating or multiple_choice or checkbox): comma-separated options

  Example format:
  rating
  How satisfied are you with our service?
  yes
  Very Dissatisfied, Dissatisfied, Neutral, Satisfied, Very Satisfied

  multiple_choice
  Which areas need more attention to cleanliness?
  Bathroom, Bedroom, Common Areas, Pool Area
  
  checkbox
  Which services do you use the most?
  Cleaning, Dining, Entertaining, Event Planning, Food Preparation, Laundry, Party Planning

  text
  What could we improve?
  no`;

    const response = await this.httpService.axiosRef.post(
      `${this.apiUrl}/generate`,
      {
        model: this.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.5,
          top_p: 0.7,
        },
      },
      {
        timeout: 60000,
      },
    );

    // Parse the text response into our required format
    const questions = response.data.response.trim().split('\n\n');
    return questions.map((questionBlock) => {
      const lines = questionBlock.trim().split('\n');
      const type = lines[0].trim();
      const question = lines[1].trim();
      const required = lines[2].trim().toLowerCase() === 'yes';
      const options =
        (type === QuestionType.RATING ||
          type === QuestionType.MULTIPLE_CHOICE ||
          type === QuestionType.CHECKBOX) &&
        lines[3]
          ? lines[3].split(',').map((opt) => opt.trim())
          : undefined;

      return {
        type,
        question,
        required,
        ...(options && { options }),
      };
    });
  }

  /**
   * Generate a thank you message for after form submission
   * @param companyName Name of the company
   * @returns Generated thank you message
   */
  async generateThankYouMessage(companyName: string): Promise<string> {
    const prompt = `Generate a thank you message for a customer who just submitted feedback for ${companyName}. Keep it short and professional. max 4 lines.`;

    const response = await this.httpService.axiosRef.post(
      `${this.apiUrl}/generate`,
      {
        model: this.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.6,
          top_p: 0.8,
        },
      },
      {
        timeout: 60000,
      },
    );

    return response.data.response.trim();
  }
}
